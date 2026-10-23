(function (root) {
  'use strict';
  function calculate(options = {}) {
    const target = Number(options.target ?? 10), minutes = Number(options.minutes ?? 5);
    const provider = options.provider ?? 'grok', mode = options.mode ?? 'selective';
    const research = options.research ?? 'leo', posts = Number(options.posts ?? 200);
    if (![8, 10, 12].includes(target) || ![5, 15].includes(minutes) || !['grok', 'apify'].includes(provider) || !['selective', 'full'].includes(mode) || !['leo', 'grok'].includes(research) || ![100, 200, 400].includes(posts)) throw new Error('Invalid scenario');
    const dossiers = target * 2, threads = mode === 'full' ? dossiers : target;
    const redditRows = 60 + threads * 5, redditRuns = 2;
    const xRows = provider === 'apify' ? 200 + threads * 20 : 0;
    const xRuns = provider === 'apify' ? 10 + threads : 0;
    const apify = weeks => {
      const redditData = redditRows * .004 * weeks, redditStart = redditRuns * .04 * weeks;
      const xData = xRows * .00015 * weeks, xCompute = xRuns * .25 * minutes / 60 * .2 * weeks;
      return {redditData, redditStart, xData, xCompute, total: redditData + redditStart + xData + xCompute};
    };
    // Text pipeline and research extrapolate the dated 22.10 design scenario,
    // not measured new-run costs. X model-token allowances are planning inputs.
    const grok = weeks => {
      const ratio = weeks / 4.345;
      const textCentral = 5.13 * target / 8 * ratio, textHigh = 9.99 * target / 8 * ratio;
      const xTools = provider === 'grok' ? posts * .005 * weeks : 0;
      const xTokensCentral = provider === 'grok' ? 2 * posts / 200 * ratio : 0;
      const xTokensHigh = provider === 'grok' ? 6 * posts / 200 * ratio : 0;
      const researchCount = research === 'grok' ? dossiers * .5 * weeks : 0;
      // Proposed reader-question/evidence/angle card, within the existing
      // detailed assessment call. Explicit extra allowance, not measured usage.
      // Dated assessment rates: $1.25 input / $2.50 output per million tokens.
      const editorialCentral = dossiers * weeks * (1000 * 1.25 + 500 * 2.5) / 1e6;
      const editorialHigh = editorialCentral * 2;
      return {textCentral, textHigh, xTools, xTokensCentral, xTokensHigh, researchCount, editorialCentral, editorialHigh,
        central: textCentral + xTools + xTokensCentral + researchCount * .144808 + editorialCentral,
        high: textHigh + xTools + xTokensHigh + researchCount * .25 + editorialHigh};
    };
    return {target, mode, provider, research, minutes, posts, dossiers, threads, redditRows, redditRuns, xRows, xRuns,
      average: apify(4.345), five: apify(5), fiveWithReserve: apify(5).total * 1.2,
      grokAverage: grok(4.345), grokFive: grok(5), grokCap: 25,
      scope: 'planning only; Leo Gemini/Perplexity, baselines, setup and infrastructure not measured'};
  }
  const api = Object.freeze({calculate});
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RadarRoadmapBudget = api;
})(typeof window !== 'undefined' ? window : globalThis);
