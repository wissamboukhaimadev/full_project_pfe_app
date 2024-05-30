import { useState } from 'react'
import { Button, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Download } from 'lucide-react'
import base_url from '@/utils/http';

export default function ExportDownloadFile() {

    const [opened, { open, close }] = useDisclosure(false);
    const [departmentName, setDepartmentName] = useState<string | null>('Amphi');

    const downloadCSVFile = async () => {

        let url = ""
        let file_name = ""
        if (departmentName === "Amphi") {

            url = `${base_url}/api/v1/amphie/export`;
            file_name = "amphie_data.csv"
        } else if (departmentName === "ELECTROTECHNIQUE") {
            url = `${base_url}/api/v1/gbi_department/export`
            file_name = "gbi_department_data.csv"
        } else if (departmentName === "GE") {
            url = `${base_url}/api/v1/ge_department/export`
            file_name = "ge_department_data.csv"
        } else if (departmentName === "P & A & P") {
            url = `${base_url}/api/v1/pfe_room/export`
            file_name = "pfe_room_data.csv"
        } else {
            url = `${base_url}/api/v1/ge_department/export`
            file_name = "ge_department_data.csv"
        }

        const response = await fetch(url, {
            method: "GET"
        })

        try {
            if (!response.ok) {
                console.log(await response.text())
                throw new Error('Network response was not ok');
            }


            const csvData = await response.text();
            console.log(csvData)
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file_name);


            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error)
        }


    }

    return (
        <>
            <Download className="ml-7 cursor-pointer" size={28} onClick={open} />

            <Modal opened={opened} onClose={close} title="Export data">
                <p className='mb-2 mt-2'>Select a department</p>
                <Select
                    placeholder='select department'
                    data={['Amphi', 'GE', 'ELECTROTECHNIQUE', 'P & A & P']}
                    value={departmentName}
                    onChange={setDepartmentName}
                />

                <div className='mt-10 text-center'>
                    <Button onClick={downloadCSVFile}>Export To CSV</Button>

                </div>
            </Modal>
        </>
    );
}
