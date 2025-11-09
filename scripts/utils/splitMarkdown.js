// splitMarkdown.js
export function splitProjectBlocks(readmeContent) {
  // Split at "### Project X: Name"
  const blocks = readmeContent.split(/^###\s+Project\s+/m).slice(1);
  return blocks.map((b) => {
    const [headerLine, ...rest] = b.split("\n");
    return {
      headerLine,
      blockText: rest.join("\n"),
    };
  });
}

export function parseProjectHeader(headerLine) {
  // Example: "1: NG-IAM"
  const match = headerLine.match(/^(\d+):\s*(.+)$/);
  if (!match) return null;
  return { projectNumber: parseInt(match[1], 10), name: match[2].trim() };
}
