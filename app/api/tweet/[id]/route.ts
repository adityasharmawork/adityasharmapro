import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

export const revalidate = 3600;

// Normalize tweet entities to prevent "entities is not iterable" TypeError.
// Twitter's syndication API sometimes returns null/undefined for entity
// sub-fields that react-tweet expects to be arrays.
function normalizeEntities(tweet: Record<string, any>) {
  if (!tweet?.entities) return tweet;

  const e = tweet.entities;
  e.hashtags = e.hashtags ?? [];
  e.urls = e.urls ?? [];
  e.user_mentions = e.user_mentions ?? [];
  e.symbols = e.symbols ?? [];

  if (tweet.quoted_tweet) normalizeEntities(tweet.quoted_tweet);
  if (tweet.parent) normalizeEntities(tweet.parent);

  return tweet;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tweet = await getTweet(id);

    if (!tweet) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    normalizeEntities(tweet as Record<string, any>);

    return NextResponse.json(
      { data: tweet },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch tweet:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweet" },
      { status: 400 }
    );
  }
}
