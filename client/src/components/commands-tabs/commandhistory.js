import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


//Template from https://mui.com/components/data-grid/
const columns = [
  { field: 'time', headerName: 'Time', width: 200},
  { field: 'id', headerName: 'Machine ID', width: 200},
  { field: 'machine_name', headerName: 'Machine Name', width: 200},
  { field: 'type', headerName: 'Command Type', width: 200},
  { field: 'parameters', headerName: 'Parameters', width: 200},
  { field: 'file_name', headerName: 'File Name', width: 200},
  { field: 'file_b64', headerName: 'B64 File', width: 200},
  { field: 'file_dest', headerName: 'File Destination', width: 200},
  { field: 'application_name', headerName: 'Application Name', width: 200},
  { field: 'custom_Command', headerName: 'Custom Command Sent', width: 200},
];

const rows = [
  { id: 1, machine_name: 'Snow', type: 'Jon', parameters: 35 },
  { id: 2, machine_name: 'Lannister', type: 'Cersei', parameters: 42 },
  { id: 3, machine_name: 'Lannister', type: 'Jaime', parameters: 45 },
  { id: 4, machine_name: 'Stark', type: 'Arya', parameters: 16 },
  { id: 5, machine_name: 'Targaryen', type: 'Daenerys', parameters: null },
  { id: 6, machine_name: 'Melisandre', type: null, parameters: 150 },
  { id: 7, machine_name: 'Clifford', type: 'Ferrara', parameters: 44 },
  { id: 8, machine_name: 'Frances', type: 'Rossini', parameters: 36 },
  { id: 9, machine_name: 'Roxie', type: 'Harvey', parameters: 65 },
];

export default function DataTable() {
  return (
    <div style={{height: '100%', width: '100%'}}>
      <DataGrid
      
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        disableMultipleColumnsSorting
        disableMultipleColumnsFiltering	
        disableColumnReorder
      />
    </div>
  );
}