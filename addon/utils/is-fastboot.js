/* global self */

export default function isFastboot() {
  return !self.document;
}
