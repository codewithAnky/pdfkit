import PDFDocument from 'pdfkit';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { employeeName, position, joiningDate, salary, company } = req.body;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Offer_Letter.pdf`);

    doc.pipe(res);

    // Header
    doc.fontSize(20).text('EINFRATECH SYSTEMS INDIA', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text('Make Better Work-Infra', { align: 'center', italic: true });
    doc.moveDown(2);

    // Offer Letter Title
    doc.fontSize(18).text('Offer Letter', { align: 'center', underline: true });
    doc.moveDown(2);

    // Greeting
    doc.fontSize(12).text(`Dear ${employeeName},`);
    doc.moveDown();

    // Introduction
    doc.text(`We are pleased to appoint you as ${position} at ${company} under the following terms and conditions:`, {
        align: 'justify'
    });
    doc.moveDown(2);

    // Section 1: Commencement / Term
    doc.fontSize(14).text('1. Commencement / Term', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`You are required to join on ${joiningDate}. You will be on an orientation period of 3 months. Based on your performance, confirmation will be reviewed.`);
    doc.moveDown(2);

    // Section 2: Remuneration
    doc.fontSize(14).text('2. Remuneration', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Your monthly salary will be ₹${salary}. During probation, you will receive a stipend as per company policy.`);
    doc.moveDown(2);

    // Section 3: Incentives
    doc.fontSize(14).text('3. Incentive Scheme', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`You will participate in the incentive scheme, which will be based on performance and contributions to the company.`);
    doc.moveDown(2);

    // Section 4: Leave Policy
    doc.fontSize(14).text('4. Leave Policy', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`You will be eligible for leave as per company rules. Leave requests must be approved by the competent authority.`);
    doc.moveDown(2);

    // Section 5: Notice Period
    doc.fontSize(14).text('5. Notice Period', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`During probation, either party may terminate employment without notice. After confirmation, a 1-month notice is required.`);
    doc.moveDown(2);

    // Acceptance Section
    doc.moveDown(2);
    doc.fontSize(14).text('Candidate’s Acceptance', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text('Name: _________________________');
    doc.moveDown();
    doc.text('Signature: _________________________');
    doc.moveDown();
    doc.text(`Date: ${new Date().toISOString().split('T')[0]}`);
    doc.moveDown(2);

    // Closing
    doc.text(`For ${company},`);
    doc.moveDown();
    doc.text('HR Head');
    doc.moveDown();

    doc.end();
}
