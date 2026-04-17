import { NextResponse } from "next/server";
import type {
  ContributionDay,
  ContributionWeek,
  ContributionData,
} from "@/types/github";

export const revalidate = 3600;

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `query {
  viewer {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
          }
        }
      }
      startedAt
    }
  }
}`;

interface RawCalendarData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

async function fetchContributions(token: string): Promise<{
  calendar: RawCalendarData;
  codingSince: number;
} | null> {
  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors) return null;

    const viewer = json.data.viewer;
    const startedAt: string = viewer.contributionsCollection.startedAt;

    return {
      calendar: viewer.contributionsCollection.contributionCalendar,
      codingSince: new Date(startedAt).getFullYear(),
    };
  } catch {
    return null;
  }
}

function mergeCalendars(
  r1: { calendar: RawCalendarData; codingSince: number } | null,
  r2: { calendar: RawCalendarData; codingSince: number } | null
): ContributionData | null {
  if (!r1 && !r2) return null;

  const calendars = [r1?.calendar, r2?.calendar].filter(
    (c): c is RawCalendarData => c !== null
  );

  if (calendars.length === 1) {
    const cal = calendars[0];
    return {
      totalContributions: cal.totalContributions,
      weeks: cal.weeks,
      codingSince: r1?.codingSince ?? r2?.codingSince ?? new Date().getFullYear(),
    };
  }

  // Two calendars: merge by date
  const countMap = new Map<string, number>();

  for (const cal of calendars) {
    for (const week of cal.weeks) {
      for (const day of week.contributionDays) {
        countMap.set(
          day.date,
          (countMap.get(day.date) ?? 0) + day.contributionCount
        );
      }
    }
  }

  const mergedWeeks: ContributionWeek[] = calendars[0].weeks.map((week) => ({
    contributionDays: week.contributionDays.map(
      (day): ContributionDay => ({
        date: day.date,
        contributionCount: countMap.get(day.date) ?? 0,
        weekday: day.weekday,
      })
    ),
  }));

  return {
    totalContributions:
      calendars[0].totalContributions + calendars[1].totalContributions,
    weeks: mergedWeeks,
    codingSince: Math.min(
      r1?.codingSince ?? Infinity,
      r2?.codingSince ?? Infinity
    ),
  };
}

export async function GET() {
  const pat1 = process.env.GITHUB_PAT_1;
  const pat2 = process.env.GITHUB_PAT_2;

  if (!pat1 && !pat2) {
    return NextResponse.json(
      { error: "GitHub tokens not configured" },
      { status: 500 }
    );
  }

  const [result1, result2] = await Promise.all([
    pat1 ? fetchContributions(pat1) : Promise.resolve(null),
    pat2 ? fetchContributions(pat2) : Promise.resolve(null),
  ]);

  const merged = mergeCalendars(result1, result2);

  if (!merged) {
    return NextResponse.json(
      { error: "Failed to fetch contribution data" },
      { status: 502 }
    );
  }

  return NextResponse.json(merged, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
