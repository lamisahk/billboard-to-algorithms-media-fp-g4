import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ====== QUIZ DATA ====== */

interface QuizItem {
  id: number;
  posts: {
    text: string;
    author: string;
    platform: string;
    isAd: boolean;
    explanation: string;
  }[];
}

const quizRounds: QuizItem[] = [
  {
    id: 1,
    posts: [
      {
        text: "I've been using this app for 3 months and my morning routine has completely changed. The guided meditations are 🔥",
        author: "@mindful_maya",
        platform: "Instagram Story",
        isAd: true,
        explanation: "This is a paid influencer partnership with a meditation app. The casual tone and personal anecdote are designed to be indistinguishable from organic content.",
      },
      {
        text: "honestly struggling with anxiety lately. started journaling before bed and it's actually helping? small wins.",
        author: "@jennyk_92",
        platform: "Twitter/X",
        isAd: false,
        explanation: "A genuine personal post. No product mention, no link, no call to action.",
      },
      {
        text: "New study shows 73% of Gen Z reports improved focus after switching to scheduled screen time. Here's what the data says →",
        author: "@wellness.daily",
        platform: "Instagram Carousel",
        isAd: true,
        explanation: "This is native advertising for a screen-time management app. The 'study' was funded by the company. The editorial format disguises commercial intent.",
      },
    ],
  },
  {
    id: 2,
    posts: [
      {
        text: "Just hit my 100-day streak on Duolingo. My Spanish is still terrible but the owl has psychological control over me.",
        author: "@techbro_dan",
        platform: "Twitter/X",
        isAd: false,
        explanation: "An organic, self-deprecating post. Though it mentions a brand, there's no commercial arrangement.",
      },
      {
        text: "I switched our whole team to this project management tool and our sprint velocity increased 40%. Thread on how we did it 🧵",
        author: "@sarahbuilds",
        platform: "Twitter/X",
        isAd: true,
        explanation: "A paid partnership structured as a personal productivity thread. The specific metric and thread format are designed to look like authentic peer advice.",
      },
      {
        text: "This smart ring literally told me I was getting sick 2 days before I felt symptoms. The future is on my finger.",
        author: "@biohack.life",
        platform: "TikTok",
        isAd: true,
        explanation: "Paid wearable tech placement within a biohacking content channel. The dramatic personal testimony is a scripted endorsement.",
      },
    ],
  },
  {
    id: 3,
    posts: [
      {
        text: "My financial advisor told me to stop checking my portfolio daily. Best advice I've gotten this year.",
        author: "@adulting_hard",
        platform: "Reddit",
        isAd: false,
        explanation: "A genuine post in a personal finance community. No product link, no referral code.",
      },
      {
        text: "I made $3,200 last month with fractional investing. It's not life-changing money but it's building. Here's my strategy:",
        author: "@invest.with.intention",
        platform: "Instagram Reel",
        isAd: true,
        explanation: "A paid partnership with an investment platform. The specific dollar amount and 'strategy' format create the illusion of peer financial advice.",
      },
      {
        text: "Just realized I've been paying for 3 streaming services I don't use. Adulting is a scam.",
        author: "@broke.millennial",
        platform: "Twitter/X",
        isAd: false,
        explanation: "An organic post with no commercial intent. The self-deprecating humor is genuine, not a copywriting technique.",
      },
    ],
  },
];

/* ====== COMPONENT ====== */

export default function SpotTheAdQuiz() {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const headerRef = useScrollReveal<HTMLDivElement>(0.2);

  const round = quizRounds[currentRound];

  const handleSelect = (postIndex: number) => {
    if (revealed) return;
    setSelectedPost(postIndex);
  };

  const handleReveal = () => {
    if (selectedPost === null) return;
    setRevealed(true);
    // Count correct if user selected an ad
    if (round.posts[selectedPost].isAd) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentRound < quizRounds.length - 1) {
      setCurrentRound((r) => r + 1);
      setSelectedPost(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentRound(0);
    setSelectedPost(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  };

  const adsInRound = round.posts.filter((p) => p.isAd).length;

  return (
    <section className="py-20 px-4" style={{ background: "#0a0a0f" }}>
      <div ref={headerRef} className="reveal-blur max-w-3xl mx-auto text-center mb-12">
        <p className="font-pixel text-[10px] tracking-[0.3em] mb-3" style={{ color: "hsl(var(--ig-pink))" }}>
          INTERACTIVE QUIZ
        </p>
        <h3 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: "white" }}>
          Can You Spot the Ad?
        </h3>
        <p className="font-mono text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
          Three posts. At least one is a paid advertisement. Can you tell which? This is what invisible advertising looks like.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!finished ? (
          <>
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                ROUND {currentRound + 1} / {quizRounds.length}
              </span>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: "hsl(var(--ig-green))" }}>
                SCORE: {score}
              </span>
            </div>

            {/* Posts */}
            <div className="space-y-4 mb-8">
              {round.posts.map((post, i) => {
                const isSelected = selectedPost === i;
                const isCorrect = revealed && post.isAd;
                const isWrong = revealed && isSelected && !post.isAd;

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="w-full text-left rounded-xl p-5 transition-all duration-300"
                    style={{
                      background: revealed
                        ? isCorrect
                          ? "rgba(34, 197, 94, 0.08)"
                          : isWrong
                          ? "rgba(239, 68, 68, 0.08)"
                          : "rgba(255,255,255,0.02)"
                        : isSelected
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${
                        revealed
                          ? isCorrect
                            ? "rgba(34, 197, 94, 0.4)"
                            : isWrong
                            ? "rgba(239, 68, 68, 0.4)"
                            : "rgba(255,255,255,0.06)"
                          : isSelected
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.06)"
                      }`,
                      cursor: revealed ? "default" : "pointer",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <div>
                        <span className="font-mono text-xs font-bold block" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {post.author}
                        </span>
                        <span className="font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {post.platform}
                        </span>
                      </div>
                      {revealed && isCorrect && (
                        <span
                          className="ml-auto font-pixel text-[8px] tracking-wider px-2 py-1 rounded"
                          style={{ background: "rgba(34, 197, 94, 0.2)", color: "hsl(145, 80%, 50%)" }}
                        >
                          SPONSORED
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                      "{post.text}"
                    </p>
                    {revealed && (
                      <p
                        className="font-mono text-xs mt-3 leading-relaxed pt-3"
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {post.explanation}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              {!revealed ? (
                <button
                  onClick={handleReveal}
                  disabled={selectedPost === null}
                  className="px-6 py-3 rounded-lg font-mono text-xs tracking-wider transition-all duration-300"
                  style={{
                    background: selectedPost !== null ? "hsl(var(--ig-pink))" : "rgba(255,255,255,0.05)",
                    color: selectedPost !== null ? "white" : "rgba(255,255,255,0.2)",
                    cursor: selectedPost !== null ? "pointer" : "not-allowed",
                  }}
                >
                  REVEAL ANSWER
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg font-mono text-xs tracking-wider transition-all duration-300"
                  style={{
                    background: "hsl(var(--mac-blue-dark))",
                    color: "white",
                  }}
                >
                  {currentRound < quizRounds.length - 1 ? "NEXT ROUND →" : "SEE RESULTS"}
                </button>
              )}
            </div>

            {revealed && (
              <p className="text-center font-mono text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                {adsInRound > 1
                  ? `This round had ${adsInRound} ads. Could you tell?`
                  : selectedPost !== null && round.posts[selectedPost].isAd
                  ? "You spotted it. Most people can't."
                  : "You missed it. That's exactly how invisible advertising works."}
              </p>
            )}
          </>
        ) : (
          /* Results */
          <div
            className="rounded-xl p-8 md:p-12 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="font-pixel text-[10px] tracking-[0.3em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              YOUR RESULTS
            </p>
            <p
              className="font-display text-6xl font-bold mb-2"
              style={{
                color:
                  score === quizRounds.length
                    ? "hsl(var(--ig-green))"
                    : score >= 2
                    ? "hsl(var(--ig-amber))"
                    : "hsl(var(--ig-pink))",
              }}
            >
              {score}/{quizRounds.length}
            </p>
            <p className="font-mono text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
              {score === quizRounds.length
                ? "Perfect. You have unusually high advertising literacy."
                : score >= 2
                ? "Not bad — but most of what you scroll past daily is harder to spot than this."
                : "This is exactly the point. Modern advertising is designed to be invisible."}
            </p>
            <p className="font-mono text-xs max-w-lg mx-auto mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
              Van Reijmersdal et al. (2023) found that even with disclosure labels present, most consumers
              failed to recognize native advertising. The structural embedding of commercial content within
              editorial formats consistently prevents recognition of commercial intent.
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-lg font-mono text-xs tracking-wider"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              TRY AGAIN
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
