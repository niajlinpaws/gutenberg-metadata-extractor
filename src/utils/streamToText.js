/**
 * Convert stream to text
 * @param {object} stream
 */
module.exports = async function streamToText(stream) {
  let text = '';
  for await (const chunk of stream) {
    text += chunk;
  }
  return text;
}
  