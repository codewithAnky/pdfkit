import { useState } from 'react';

export default function OfferLetterForm() {
    const [formData, setFormData] = useState({
        employeeName: '',
        position: '',
        joiningDate: '',
        salary: '',
        company: 'Einfratech Systems India'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/generateOfferLetter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Ensure proper file download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Offer_Letter.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Cleanup
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        } else {
            alert('Failed to generate PDF');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto' }}>
            <h2>Generate Offer Letter</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} required />

                <label>Position:</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} required />

                <label>Joining Date:</label>
                <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />

                <label>Salary:</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />

                <button type="submit">Generate Offer Letter</button>
            </form>
        </div>
    );
}
