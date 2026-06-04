// ============================================================
// HOW TO ADD VIDEOS:
// Key format:  "category--grade--subject"
// Add as many { id, title } objects as you want per group
//
// CATEGORIES:  qudurat | tahsili | term1 | term2
//
// ELEMENTARY GRADES:   اول-ابتدائي | ثاني-ابتدائي | ثالث-ابتدائي
//                      رابع-ابتدائي | خامس-ابتدائي | سادس-ابتدائي
// ELEMENTARY SUBJECTS: math | arabic | english | science | social | islamic
//
// MIDDLE GRADES:       اول-متوسط | ثاني-متوسط | ثالث-متوسط
// HIGH GRADES:         اول-ثانوي | ثاني-ثانوي | ثالث-ثانوي
// MIDDLE/HIGH SUBJECTS: math | physics | chemistry | biology | english
// ============================================================

const VIDEOS_DATA = {

  // ── ELEMENTARY EXAMPLES ────────────────────────────────────

  "term1--اول-ابتدائي--math": [
    { id: "VIDEO_ID", title: "درس 1 - الأعداد من 1 إلى 10" },
    { id: "VIDEO_ID", title: "درس 2 - الجمع البسيط" },
  ],

  "term1--اول-ابتدائي--arabic": [
    { id: "VIDEO_ID", title: "درس 1 - الحروف الهجائية" },
  ],

  "term1--رابع-ابتدائي--science": [
    { id: "VIDEO_ID", title: "درس 1 - المادة وخصائصها" },
  ],

  "term2--سادس-ابتدائي--math": [
    { id: "VIDEO_ID", title: "درس 1 - الكسور العشرية" },
  ],

  // ── MIDDLE SCHOOL EXAMPLES ─────────────────────────────────

  "term1--اول-متوسط--math": [
    { id: "VIDEO_ID", title: "درس 1 - الأعداد الصحيحة" },
  ],

  "term1--ثاني-متوسط--english": [
    { id: "VIDEO_ID", title: "Lesson 1 - Present Tenses" },
  ],

  // ── HIGH SCHOOL EXAMPLES ───────────────────────────────────

  "qudurat--ثالث-ثانوي--math": [
    { id: "VIDEO_ID", title: "درس 1 - المعادلات التربيعية" },
    { id: "VIDEO_ID", title: "درس 2 - الجذور" },
  ],

  "tahsili--ثاني-ثانوي--chemistry": [
    { id: "VIDEO_ID", title: "درس 1 - الجدول الدوري" },
  ],

  "tahsili--ثالث-ثانوي--biology": [
    { id: "VIDEO_ID", title: "درس 1 - الخلية" },
  ],

  // Add your videos below ...

};
