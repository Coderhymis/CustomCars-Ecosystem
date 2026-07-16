// app/api/ai/resale-score/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { vehicleMake, baseValue, modifications } = await request.json();

    if (!vehicleMake || !baseValue) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Algorithmic simulation predicting resale changes based on active mods list
    let resaleDeltaPercent = 0;
    let demandScoreMultiplier = 1.0;
    const notes: string[] = [];

    modifications.forEach((mod: { type: string; quality: string }) => {
      if (mod.type === "wrap") {
        if (mod.quality === "premium") {
          resaleDeltaPercent += 2.5; // PPF wraps protect paint
          notes.push("Premium Paint Protection Film (PPF) protects factory clear coat, boosting demand score (+2.5%)");
        } else {
          resaleDeltaPercent -= 1.5; // cheap wrap leaves glue residue
          notes.push("Budget wrap vinyl may degrade paint finish upon removal (-1.5%)");
        }
      }
      
      if (mod.type === "exhaust") {
        resaleDeltaPercent -= 4.0; // decat exhaust splits resale appeal
        demandScoreMultiplier = 0.85;
        notes.push("Aftermarket loud decat exhaust limits general buyer target pool (-4.0% resale, -15% demand)");
      }

      if (mod.type === "tuning") {
        resaleDeltaPercent -= 5.0; // engine tuning voids warranties
        notes.push("Stage 2 engine ECU tuning voids factory powertrain warranty, increasing depreciation risk (-5.0%)");
      }

      if (mod.type === "wheels") {
        resaleDeltaPercent += 1.5; // premium rims raise value
        notes.push("BBS/OZ racing wheels increase visual appeal (+1.5%)");
      }
    });

    const expectedResaleValue = Math.round(baseValue * (1 + resaleDeltaPercent / 100));
    const depreciationScore = Math.max(20, Math.min(100, Math.round(80 + resaleDeltaPercent)));

    return NextResponse.json({
      success: true,
      data: {
        baseValue,
        expectedResaleValue,
        resaleDeltaPercent,
        depreciationScore,
        demandScoreMultiplier,
        analystNotes: notes
      }
    });

  } catch (error) {
    return NextResponse.json({ error: "Depreciation forecast protocols failed" }, { status: 500 });
  }
}
