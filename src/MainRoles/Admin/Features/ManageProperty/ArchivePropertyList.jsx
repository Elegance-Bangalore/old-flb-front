import React, { useEffect, useState } from 'react'
import { FormControl, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "../../AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "../../AdminLayouts/AdminSidebarMenu";
import ArchivePropertyTable from './ArchivePropertyTable';
import { agricultureLand, Estates, farmhouse, farmland } from '@/CustomServices/Constant';

const ArchivePropertyList = () => {

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyTyppe] = useState("");
  const [propertyApproval, setPropertyApproval] = useState("");

  return (
       <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">Archive Properties</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div>
                <form className="row">
                  <div className="col-md-3">
                    <FormControl className="mb-4">
                      <TextField
                        id=""
                        label="Search by Name"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-2 col-12 mb-3">
                    <FormControl variant="outlined">
                      <InputLabel id=" ">
                        Property Type
                      </InputLabel>
                      <Select labelId="" label="Property Type"value={propertyType} onChange={(e) => setPropertyTyppe(e.target.value)} MenuProps={{
                        disableScrollLock: true,
                      }}>
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={farmhouse}>Farmhouse</MenuItem>
                        <MenuItem value={farmland}>Farmland</MenuItem>
                        <MenuItem value={Estates}>Estates</MenuItem>
                        <MenuItem value={agricultureLand}>Agriculture Land</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-2 col-12 mb-3">
                    <FormControl variant="outlined">
                      <InputLabel id=" ">
                        Status
                      </InputLabel>
                      <Select labelId="" label="Availability" value={propertyApproval} onChange={(e) => setPropertyApproval(e.target.value)} MenuProps={{
                        disableScrollLock: true,
                      }}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="sold-out">Sold</MenuItem>
                        <MenuItem value="available">Available</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </form>
                <div className="row">
                  <div className="col-md-12">
                    <ArchivePropertyTable search={search} propertyApproval={propertyApproval} propertyType={propertyType} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </>
  )
}

export default ArchivePropertyList