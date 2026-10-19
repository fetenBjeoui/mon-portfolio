import {
  education,
  experience,
  languages,
  profile,
  projects,
  skills,
} from "../data";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

export async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function pdfEscape(text: string) {
  const punct: Record<string, string> = {
    "’": "'",
    "‘": "'",
    "“": '"',
    "”": '"',
    "–": "-",
    "—": "-",
    "…": "...",
    "«": '"',
    "»": '"',
    "œ": "oe",
    "Œ": "OE",
    "\u00a0": " ",
  };
  let out = "";
  for (const ch of text) {
    if (punct[ch]) {
      out += punct[ch];
      continue;
    }
    if (ch === "\\") {
      out += "\\\\";
      continue;
    }
    if (ch === "(") {
      out += "\\(";
      continue;
    }
    if (ch === ")") {
      out += "\\)";
      continue;
    }
    const code = ch.charCodeAt(0);
    if (code >= 160 && code <= 255) {
      out += "\\" + code.toString(8).padStart(3, "0");
      continue;
    }
    out += code < 32 || code > 126 ? " " : ch;
  }
  return out;
}

function wrap(text: string, max = 92) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

class CvSheet {
  cmds: string[] = [];
  y = 800;

  text(value: string, size: number, bold: boolean, x = 36, color = "0.106 0.075 0.141") {
    this.cmds.push(`${color} rg`);
    this.cmds.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${this.y} Td (${pdfEscape(value)}) Tj ET`);
  }

  gap(amount: number) {
    this.y -= amount;
  }

  rule(width: number) {
    this.cmds.push(`0.761 0.2 0.365 rg`);
    this.cmds.push(`36 ${this.y - 5} ${width} 1.3 re f`);
  }

  section(title: string) {
    this.gap(8);
    this.text(title, 11, true, 36, "0.553 0.137 0.267");
    this.rule(Math.max(78, title.length * 7.2));
    this.gap(18);
  }

  paragraph(value: string, size = 10, lead = 13, max = 90) {
    for (const line of wrap(value, max)) {
      this.text(line, size, false, 36);
      this.gap(lead);
    }
  }

  bullet(value: string) {
    const lines = wrap(value, 88);
    lines.forEach((line, index) => {
      if (index === 0) {
        this.cmds.push(`0.761 0.2 0.365 rg`);
        this.cmds.push(`36 ${this.y + 1.4} 3.1 3.1 re f`);
      }
      this.text(line, 10, false, 46);
      this.gap(13);
    });
  }

  footer(page: number, total: number) {
    const saved = this.y;
    this.y = 26;
    this.text(`Feten Bejaoui  ·  Ariana  ·  ${page} / ${total}`, 8, false, 36, "0.45 0.38 0.46");
    this.y = saved;
    this.cmds.push(`% end ${saved}`);
  }
}

function paintFrame(sheet: CvSheet, tallHeader: boolean) {
  sheet.cmds.push("0.761 0.2 0.365 rg");
  sheet.cmds.push(tallHeader ? "0 778 595 64 re f" : "0 806 595 36 re f");
  sheet.cmds.push("0.106 0.075 0.141 rg");
  sheet.cmds.push("0 0 6 842 re f");
}

export function buildCvPdf() {
  const first = new CvSheet();
  paintFrame(first, true);
  first.y = 814;
  first.text(profile.name, 22, true, 36, "1 1 1");
  first.y = 794;
  first.text(profile.role, 9, false, 36, "1 0.92 0.94");
  first.y = 754;
  first.text(`${profile.location}    ·    ${profile.phone}    ·    ${profile.email}`, 9, false, 36, "0.28 0.22 0.32");
  first.gap(14);
  first.text(profile.linkedin.replace("https://", ""), 9, false, 36, "0.553 0.137 0.267");
  first.gap(26);
  first.section("PROFIL");
  first.paragraph(profile.about, 10, 13.5, 92);
  first.gap(8);
  first.section("EXPERIENCE");
  for (const job of experience) {
    first.text(`${job.period}  —  ${job.title}`, 11, true);
    first.gap(14);
    first.text(job.company, 9, false, 36, "0.35 0.28 0.38");
    first.gap(15);
    job.points.forEach((point) => first.bullet(point));
    first.gap(8);
  }
  first.footer(1, 2);

  const second = new CvSheet();
  paintFrame(second, false);
  second.y = 818;
  second.text(profile.name, 14, true, 36, "1 1 1");
  second.y = 774;
  second.section("PROJETS");
  for (const project of projects) {
    second.text(`${project.title}  —  ${project.period}`, 11, true);
    second.gap(14);
    second.text(project.place, 9, false, 36, "0.35 0.28 0.38");
    second.gap(14);
    second.paragraph(project.description, 10, 13, 92);
    second.paragraph(project.tech.join("  ·  "), 9, 12, 92);
    project.points.forEach((point) => second.bullet(point));
    second.gap(6);
  }
  second.gap(4);
  second.section("FORMATION");
  for (const item of education) {
    second.text(`${item.period}  —  ${item.title}`, 11, true);
    second.gap(14);
    second.text(item.school, 10, false, 36, "0.35 0.28 0.38");
    second.gap(16);
  }
  second.section("COMPETENCES");
  for (const group of skills) {
    second.paragraph(`${group.title} : ${group.items.join(", ")}`, 10, 13, 92);
    second.gap(2);
  }
  second.gap(4);
  second.section("LANGUES");
  second.paragraph(
    languages.map((lang) => `${lang.name} — ${lang.level.toLowerCase()} (niveau indicatif)`).join("    ·    "),
    10,
    13,
    92,
  );
  second.footer(2, 2);

  const streams = [first.cmds.join("\n"), second.cmds.join("\n")];
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n",
    "4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 6 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n",
    `5 0 obj\n<< /Length ${streams[0].length} >>\nstream\n${streams[0]}\nendstream\nendobj\n`,
    `6 0 obj\n<< /Length ${streams[1].length} >>\nstream\n${streams[1]}\nendstream\nendobj\n`,
    "7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n",
    "8 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += object;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

export function downloadCv() {
  downloadBlob(new Blob([buildCvPdf()], { type: "application/pdf" }), "Feten-Bejaoui-CV.pdf");
}

export function downloadVCard() {
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Bejaoui;Feten;;;",
    "FN;CHARSET=UTF-8:Feten Bejaoui",
    "ORG;CHARSET=UTF-8:STE Labidi Viandes",
    "TITLE;CHARSET=UTF-8:Chargée de Gestion Administrative & Opérations d'Import",
    "TEL;TYPE=CELL:+21629842008",
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    "ADR;TYPE=HOME;CHARSET=UTF-8:;;Ariana;;;Tunisie",
    `URL:${profile.linkedin}`,
    "END:VCARD",
  ].join("\r\n");
  downloadBlob(new Blob([card], { type: "text/vcard;charset=utf-8" }), "Feten-Bejaoui.vcf");
}
