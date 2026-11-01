/**
 * Demo data — lets you show the full flow to judges without relying on OCR
 * quality or on having sample photos at hand. All values are fictional.
 *
 * It builds the same "extractedFields" payload that the OCR step produces,
 * with a story that matches the pitch deck:
 *   - name differs slightly between two documents  -> "Verify"
 *   - one required document is not provided        -> "Missing"
 *   - date of birth agrees                         -> "Matched"
 */
export function buildDemoFields(docTypes = []) {
  const fields = {};
  docTypes.forEach((docType, i) => {
    const isLast = i === docTypes.length - 1 && docTypes.length > 2;
    if (isLast) return; // left out on purpose -> "Missing"

    if (i === 0) {
      fields[docType] = {
        name: 'asha kumari',
        date_of_birth: '12/04/2001',
        address: 'Ward 5, Sample Nagar',
        _confidence: { name: 0.95, date_of_birth: 0.93, address: 0.88 },
      };
    } else if (i === 1) {
      fields[docType] = {
        name: 'asha kumar',
        date_of_birth: '12/04/2001',
        _confidence: { name: 0.7, date_of_birth: 0.9 }, // below 0.75 -> human review
      };
    } else {
      fields[docType] = {
        name: 'asha kumari',
        _confidence: { name: 0.9 },
      };
      // The date-of-birth rule compares Aadhaar with the marksheet, so give it one.
      if (docType === 'marksheet') {
        fields[docType].date_of_birth = '12/04/2001';
        fields[docType]._confidence.date_of_birth = 0.9;
      }
    }
  });
  return fields;
}
