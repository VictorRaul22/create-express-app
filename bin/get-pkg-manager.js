function getPkgManager() {
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }

  return "npm";
}
module.exports = {
  getPkgManager,
};
