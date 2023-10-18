import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetAdminsQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'

const Admin = () => {
    const theme = useTheme();
    const { data, isLoading} = useGetAdminsQuery();
    
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3") //Formatting the phone number with regX code. 3-3-4
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        }
    ]

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="Admins" subtitle="Managing Admins and List of Admins" />
        {/* Manipulating CSS properties of some classes */}
        <Box mt="40px" height="75vh" sx={{
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`
            }
        }}>
            <DataGrid
                loading={isLoading || !data} //Loading value
                getRowId={(row) => row._id} //Gets the row id from db
                rows={data || []} //Shows data if available, empty if not
                columns={columns} //Passing the columns array made into the property.
            />
        </Box>
    </Box>
  )
}

export default Admin