import { useState } from 'react';

export default function Appointment() {
    const [formData, setFormData] = useState({ employeeName: '', date: '', position: '', company: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const generatePDF = async () => {
        const response = await fetch('/api/pdf/appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Appoitment_letter.pdf';
            link.click();
        }
    };

    return (
        <div>
            <h1>Generate Appoitment letter</h1>
            <input type="text" name="employeeName" placeholder="Employee Name" onChange={handleChange} />
            <input type="text" name="position" placeholder="Position" onChange={handleChange} />
            <input type="text" name="company" placeholder="Company Name" onChange={handleChange} />
            <input type="date" name="date" onChange={handleChange} />
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
}
