/**
 * Wire Brand Partnerships Mastery into tracks, curriculum, registry, catalog, SEO, UI, tests.
 * Run AFTER write-lessons + wire. Idempotent where practical.
 * node scripts/tmp-bp-integrate.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const write = (p, s) => fs.writeFileSync(path.join(ROOT, p), s, "utf8");

const LESSONS = [
  ["understanding-brand-partnerships", "Understanding Brand Partnerships", "intermediate"],
  ["building-your-professional-creator-profile", "Building Your Professional Creator Profile", "intermediate"],
  ["creating-an-electronic-press-kit", "Creating an Electronic Press Kit (EPK)", "intermediate"],
  ["finding-brands-that-fit-your-audience", "Finding Brands That Fit Your Audience", "intermediate"],
  ["professional-outreach-and-communication", "Professional Outreach & Communication", "intermediate"],
  ["negotiating-sponsorships-professionally", "Negotiating Sponsorships Professionally", "advanced"],
  ["delivering-outstanding-campaigns", "Delivering Outstanding Campaigns", "advanced"],
  ["reporting-results-and-building-repeat-business", "Reporting Results & Building Repeat Business", "advanced"],
  ["becoming-a-long-term-brand-partner", "Becoming a Long-Term Brand Partner", "advanced"],
  ["brand-partnerships-capstone-professional-portfolio", "Brand Partnerships Capstone: Professional Portfolio", "advanced"],
];

const camel = (slug) =>
  slug
    .split("-")
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join("")
    .replace(/Epk/g, "Epk")
    .replace(/electronicPressKit/, "electronicPressKit");

function toImportName(slug) {
  return slug
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

// Prefer explicit names matching registry style
const IMPORT_NAMES = {
  "understanding-brand-partnerships": "understandingBrandPartnerships",
  "building-your-professional-creator-profile": "buildingYourProfessionalCreatorProfile",
  "creating-an-electronic-press-kit": "creatingAnElectronicPressKit",
  "finding-brands-that-fit-your-audience": "findingBrandsThatFitYourAudience",
  "professional-outreach-and-communication": "professionalOutreachAndCommunication",
  "negotiating-sponsorships-professionally": "negotiatingSponsorshipsProfessionally",
  "delivering-outstanding-campaigns": "deliveringOutstandingCampaigns",
  "reporting-results-and-building-repeat-business": "reportingResultsAndBuildingRepeatBusiness",
  "becoming-a-long-term-brand-partner": "becomingALongTermBrandPartner",
  "brand-partnerships-capstone-professional-portfolio": "brandPartnershipsCapstoneProfessionalPortfolio",
};

function patchOnce(file, needle, insertion, label) {
  let s = read(file);
  if (s.includes(insertion.trim().slice(0, 40)) || s.includes("Brand Partnerships Mastery")) {
    // more specific checks below per file
  }
  if (!s.includes(needle)) {
    console.error(`FAIL ${label}: needle not found in ${file}`);
    process.exit(1);
  }
  if (s.includes(insertion)) {
    console.log(`skip ${label} (already present)`);
    return;
  }
  s = s.replace(needle, needle + insertion);
  write(file, s);
  console.log(`patched ${label}`);
}

// —— tracks.ts ——
{
  const file = "src/lib/resources/tracks.ts";
  let s = read(file);
  if (!s.includes('"partnerships"')) {
    s = s.replace('"wellness",\n] as const', '"wellness",\n  "partnerships",\n] as const');
    s = s.replace(
      `description:
      "Career longevity for creators — burnout prevention, ergonomics, voice care, mental resilience, sustainable schedules, personal financial buffers, boundaries, creative recovery, setback protocols, and a Personal Creator Longevity Plan.",
  },
];`,
      `description:
      "Career longevity for creators — burnout prevention, ergonomics, voice care, mental resilience, sustainable schedules, personal financial buffers, boundaries, creative recovery, setback protocols, and a Personal Creator Longevity Plan.",
  },
  {
    id: "partnerships",
    title: "Brand Partnerships Mastery",
    lessonInLabel: "Brand Partnerships Mastery",
    partOfLabel: "StreamerU · Brand Partnerships Mastery",
    description:
      "Professional brand partnerships — readiness, EPK/media kit, fit research, outreach, negotiation principles, campaign delivery, reporting, renewals, and a Professional Brand Partnership Portfolio.",
  },
];`,
    );
    s = s.replace(
      'wellness: "Creator Wellness & Longevity Mastery",\n};',
      'wellness: "Creator Wellness & Longevity Mastery",\n  partnerships: "Brand Partnerships Mastery",\n};',
    );
    write(file, s);
    console.log("patched tracks.ts");
  } else console.log("skip tracks.ts");
}

// —— curriculum.ts ——
{
  const file = "src/lib/resources/curriculum.ts";
  let s = read(file);
  if (!s.includes("Brand Partnerships Mastery")) {
    s = s.replace(
      '"Creator Wellness & Longevity Mastery",\n] as const',
      '"Creator Wellness & Longevity Mastery",\n  "Brand Partnerships Mastery",\n] as const',
    );
    const entries = LESSONS.map(
      ([slug, title], i) => `  {
    globalOrder: ${175 + i},
    slug: "${slug}",
    title: "${title}",
    trackId: "partnerships",
    programName: "Brand Partnerships Mastery",
    lessonInProgram: ${i + 1},
    lessonsInProgram: 10,
  },`,
    ).join("\n");
    s = s.replace(
      `    lessonsInProgram: 10,
  },
];

const CURRICULUM_BY_SLUG`,
      `    lessonsInProgram: 10,
  },
  // BRAND PARTNERSHIPS MASTERY (10)
${entries}
];

const CURRICULUM_BY_SLUG`,
    );
    write(file, s);
    console.log("patched curriculum.ts");
  } else console.log("skip curriculum.ts");
}

// —— lessons/index.ts ——
{
  const file = "src/content/streameru/lessons/index.ts";
  let s = read(file);
  if (!s.includes("understandingBrandPartnerships") && !s.includes("understanding-brand-partnerships")) {
    const imports = LESSONS.map(
      ([slug]) =>
        `import { lesson as ${IMPORT_NAMES[slug]} } from "./${slug}";`,
    ).join("\n");
    s = s.replace(
      `import { lesson as creatorWellnessCapstonePersonalLongevityPlan } from "./creator-wellness-capstone-personal-longevity-plan";\n`,
      `import { lesson as creatorWellnessCapstonePersonalLongevityPlan } from "./creator-wellness-capstone-personal-longevity-plan";\n${imports}\n`,
    );
    const names = LESSONS.map(([slug]) => `  ${IMPORT_NAMES[slug]},`).join("\n");
    s = s.replace(
      `  creatorWellnessCapstonePersonalLongevityPlan,\n];`,
      `  creatorWellnessCapstonePersonalLongevityPlan,\n${names}\n];`,
    );
    write(file, s);
    console.log("patched lessons/index.ts");
  } else console.log("skip lessons/index.ts");
}

// —— registry.ts ——
{
  const file = "src/lib/assessments/registry.ts";
  let s = read(file);
  if (!s.includes("quizzes/partnerships/")) {
    const imports = LESSONS.map(
      ([slug]) =>
        `import { quiz as ${IMPORT_NAMES[slug]} } from "@/lib/assessments/quizzes/partnerships/${slug}";`,
    ).join("\n");
    s = s.replace(
      `import { quiz as creatorWellnessCapstonePersonalLongevityPlan } from "@/lib/assessments/quizzes/wellness/creator-wellness-capstone-personal-longevity-plan";\n`,
      `import { quiz as creatorWellnessCapstonePersonalLongevityPlan } from "@/lib/assessments/quizzes/wellness/creator-wellness-capstone-personal-longevity-plan";\n${imports}\n`,
    );
    s = s.replace(
      `import { exam as finalWellness } from "@/lib/assessments/exams/program-wellness";\n`,
      `import { exam as finalWellness } from "@/lib/assessments/exams/program-wellness";\nimport { exam as finalPartnerships } from "@/lib/assessments/exams/program-partnerships";\n`,
    );
    const names = LESSONS.map(([slug]) => `  ${IMPORT_NAMES[slug]},`).join("\n");
    s = s.replace(
      `  creatorWellnessCapstonePersonalLongevityPlan,\n];`,
      `  creatorWellnessCapstonePersonalLongevityPlan,\n${names}\n];`,
    );
    s = s.replace(
      `  finalWellness,\n];`,
      `  finalWellness,\n  finalPartnerships,\n];`,
    );
    write(file, s);
    console.log("patched registry.ts");
  } else console.log("skip registry.ts");
}

// —— catalog.ts ——
{
  const file = "src/lib/streameru-library/catalog.ts";
  let s = read(file);
  if (!s.includes("BRAND_PARTNERSHIPS_MASTERY_RESOURCES")) {
    s = s.replace(
      `import { CREATOR_WELLNESS_LONGEVITY_MASTERY_RESOURCES } from "@/content/streameru/library/creator-wellness-longevity-mastery";\n`,
      `import { CREATOR_WELLNESS_LONGEVITY_MASTERY_RESOURCES } from "@/content/streameru/library/creator-wellness-longevity-mastery";\nimport { BRAND_PARTNERSHIPS_MASTERY_RESOURCES } from "@/content/streameru/library/brand-partnerships-mastery";\n`,
    );
    s = s.replace(
      `  ...CREATOR_WELLNESS_LONGEVITY_MASTERY_RESOURCES,\n`,
      `  ...CREATOR_WELLNESS_LONGEVITY_MASTERY_RESOURCES,\n  ...BRAND_PARTNERSHIPS_MASTERY_RESOURCES,\n`,
    );
    write(file, s);
    console.log("patched catalog.ts");
  } else console.log("skip catalog.ts");
}

// —— lesson-seo/index.ts ——
{
  const file = "src/lib/resources/lesson-seo/index.ts";
  let s = read(file);
  if (!s.includes("BRAND_PARTNERSHIPS_MASTERY_LESSON_SEO")) {
    s = s.replace(
      `import { CREATOR_WELLNESS_LONGEVITY_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/creator-wellness-longevity-mastery";\n`,
      `import { CREATOR_WELLNESS_LONGEVITY_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/creator-wellness-longevity-mastery";\nimport { BRAND_PARTNERSHIPS_MASTERY_LESSON_SEO } from "@/lib/resources/lesson-seo/packs/brand-partnerships-mastery";\n`,
    );
    s = s.replace(
      `  ...CREATOR_WELLNESS_LONGEVITY_MASTERY_LESSON_SEO,\n`,
      `  ...CREATOR_WELLNESS_LONGEVITY_MASTERY_LESSON_SEO,\n  ...BRAND_PARTNERSHIPS_MASTERY_LESSON_SEO,\n`,
    );
    write(file, s);
    console.log("patched lesson-seo/index.ts");
  } else console.log("skip lesson-seo/index.ts");
}

// —— semester programs.ts ——
{
  const file = "src/lib/growth/semester/programs.ts";
  let s = read(file);
  if (!s.includes("Brand Partnerships Mastery")) {
    s = s.replace(
      `  "Creator Wellness & Longevity Mastery": {
    programKey: "wellness",
    certificateKey: "cert_creator_wellness_longevity",
  },
};`,
      `  "Creator Wellness & Longevity Mastery": {
    programKey: "wellness",
    certificateKey: "cert_creator_wellness_longevity",
  },
  "Brand Partnerships Mastery": {
    programKey: "partnerships",
    certificateKey: "cert_brand_partnerships",
  },
};`,
    );
    s = s.replace(
      `  if (certificateKey === "cert_creator_wellness_longevity") {
    return "Creator Wellness & Longevity Mastery Certificate";
  }
  return certificateKey;`,
      `  if (certificateKey === "cert_creator_wellness_longevity") {
    return "Creator Wellness & Longevity Mastery Certificate";
  }
  if (certificateKey === "cert_brand_partnerships") {
    return "Brand Partnerships Mastery Certificate";
  }
  return certificateKey;`,
    );
    write(file, s);
    console.log("patched semester/programs.ts");
  } else console.log("skip semester/programs.ts");
}

// —— difficulty-styles.ts ——
{
  const file = "src/lib/resources/difficulty-styles.ts";
  let s = read(file);
  if (!s.includes("partnerships")) {
    s = s.replace(
      `    case "wellness":
      return "advanced";`,
      `    case "wellness":
    case "partnerships":
      return "advanced";`,
    );
    write(file, s);
    console.log("patched difficulty-styles.ts");
  } else console.log("skip difficulty-styles.ts");
}

// —— checklist-from-mission.ts ——
{
  const file = "src/lib/streameru-library/checklist-from-mission.ts";
  let s = read(file);
  if (!s.includes("partnerships:")) {
    s = s.replace(
      `  wellness: "content",
};`,
      `  wellness: "content",
  partnerships: "monetization",
};`,
    );
    write(file, s);
    console.log("patched checklist-from-mission.ts");
  } else console.log("skip checklist-from-mission.ts");
}

// —— Academy Home ——
{
  const file = "src/components/streameru/StreamerUAcademyHome.tsx";
  let s = read(file);
  if (!s.includes("Brand Partnerships Mastery")) {
    s = s.replace(
      `  "Creator Wellness & Longevity Mastery":
    "Career longevity for creators — burnout prevention, ergonomics, voice care, mental resilience, sustainable schedules, personal financial buffers, boundaries, creative recovery, setback protocols, and a Personal Creator Longevity Plan.",
};`,
      `  "Creator Wellness & Longevity Mastery":
    "Career longevity for creators — burnout prevention, ergonomics, voice care, mental resilience, sustainable schedules, personal financial buffers, boundaries, creative recovery, setback protocols, and a Personal Creator Longevity Plan.",
  "Brand Partnerships Mastery":
    "Professional brand partnerships — readiness, EPK/media kit, fit research, outreach, negotiation principles, campaign delivery, reporting, renewals, and a Professional Brand Partnership Portfolio.",
};`,
    );
    s = s.replace(
      `            const isWellness = program.programName === "Creator Wellness & Longevity Mastery";
            const status = moduleStatus(`,
      `            const isWellness = program.programName === "Creator Wellness & Longevity Mastery";
            const isPartnerships = program.programName === "Brand Partnerships Mastery";
            const status = moduleStatus(`,
    );
    s = s.replace(
      `              nextProgram
                ? { label: "Next program", detail: nextProgram.programName }
                : isWellness
                  ? {
                      label: "Next steps",
                      detail:
                        "Recommended longevity path complete · Creator Wellness Lab Honors · other Mastery Paths",
                    }
                : isTts`,
      `              nextProgram
                ? { label: "Next program", detail: nextProgram.programName }
                : isPartnerships
                  ? {
                      label: "Next steps",
                      detail:
                        "Optional specialty complete · Brand Partnerships Lab Honors · other Mastery Paths",
                    }
                : isWellness
                  ? {
                      label: "Next steps",
                      detail:
                        "Brand Partnerships Mastery (optional) · Creator Wellness Lab Honors · other Mastery Paths",
                    }
                : isTts`,
    );
    write(file, s);
    console.log("patched StreamerUAcademyHome.tsx");
  } else console.log("skip StreamerUAcademyHome.tsx");
}

// —— Roadmap ——
{
  const file = "src/components/streameru/StreamerUGrowingRoadmap.tsx";
  let s = read(file);
  if (!s.includes("Brand Partnerships Mastery")) {
    s = s.replace(
      "TikTok Shop Mastery, and Creator Wellness & Longevity Mastery are published",
      "TikTok Shop Mastery, Creator Wellness & Longevity Mastery, and Brand Partnerships Mastery are published",
    );
    write(file, s);
    console.log("patched StreamerUGrowingRoadmap.tsx");
  } else console.log("skip StreamerUGrowingRoadmap.tsx");
}

// —— progress test ——
{
  const file = "src/lib/resources/streameru-progress.test.ts";
  let s = read(file);
  if (!s.includes("Brand Partnerships Mastery")) {
    s = s.replace(
      "curriculum includes Mastery Paths through Creator Wellness & Longevity Mastery and matches program lesson totals",
      "curriculum includes Mastery Paths through Brand Partnerships Mastery and matches program lesson totals",
    );
    s = s.replace("expect(CURRICULUM_TOTAL_LESSONS).toBe(174);", "expect(CURRICULUM_TOTAL_LESSONS).toBe(184);");
    s = s.replace("expect(programs).toHaveLength(19);", "expect(programs).toHaveLength(20);");
    s = s.replace(
      `    expect(programs[18]?.programName).toBe("Creator Wellness & Longevity Mastery");
    expect(programs[18]?.lessons).toHaveLength(10);
    const lessonCount`,
      `    expect(programs[18]?.programName).toBe("Creator Wellness & Longevity Mastery");
    expect(programs[18]?.lessons).toHaveLength(10);
    expect(programs[19]?.programName).toBe("Brand Partnerships Mastery");
    expect(programs[19]?.lessons).toHaveLength(10);
    const lessonCount`,
    );
    write(file, s);
    console.log("patched streameru-progress.test.ts");
  } else console.log("skip streameru-progress.test.ts");
}

// —— academy-meta.test.ts ——
{
  const file = "src/lib/streameru/academy-meta.test.ts";
  let s = read(file);
  if (!s.includes("Brand Partnerships Mastery")) {
    s = s.replace(
      "includes Presence then Content Creation before Growth, then Community, Professional, Production, Battle, Music LIVE, Gaming LIVE, Multi-Guest LIVE, AI Creator, Selling & Influence, TikTok Shop, then Creator Wellness",
      "includes Presence then Content Creation before Growth, then Community, Professional, Production, Battle, Music LIVE, Gaming LIVE, Multi-Guest LIVE, AI Creator, Selling & Influence, TikTok Shop, Creator Wellness, then Brand Partnerships",
    );
    s = s.replace(
      `    expect(STREAMERU_PROGRAM_NAMES[18]).toBe("Creator Wellness & Longevity Mastery");
`,
      `    expect(STREAMERU_PROGRAM_NAMES[18]).toBe("Creator Wellness & Longevity Mastery");
    expect(STREAMERU_PROGRAM_NAMES[19]).toBe("Brand Partnerships Mastery");
`,
    );
    if (!s.includes('programName === "Brand Partnerships Mastery"')) {
      s = s.replace(
        `    expect(wellness?.lessons[9]?.slug).toBe(
      "creator-wellness-capstone-personal-longevity-plan",
    );
`,
        `    expect(wellness?.lessons[9]?.slug).toBe(
      "creator-wellness-capstone-personal-longevity-plan",
    );
    const partnerships = curriculumByProgram().find(
      (p) => p.programName === "Brand Partnerships Mastery",
    );
    expect(partnerships?.lessons).toHaveLength(10);
    expect(partnerships?.lessons[0]?.slug).toBe("understanding-brand-partnerships");
    expect(partnerships?.lessons[9]?.slug).toBe(
      "brand-partnerships-capstone-professional-portfolio",
    );
`,
      );
    }
    write(file, s);
    console.log("patched academy-meta.test.ts");
  } else console.log("skip academy-meta.test.ts");
}

console.log("BP integrate complete");
