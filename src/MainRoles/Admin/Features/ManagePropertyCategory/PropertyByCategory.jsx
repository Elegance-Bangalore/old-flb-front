import React, { useState } from 'react'
import { FormControl, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import Header from "@/components/common/header/dashboard/Header";
import AdminMobileMenu from "@/MainRoles/Admin/AdminLayouts/AdminMobileMenu";
import AdminSidebarMenu from "@/MainRoles/Admin/AdminLayouts/AdminSidebarMenu";
import PropertyByCategoryTable from './PropertyByCategoryTable';
import AddCategoryModal from './AddCategoryModal';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { agricultureLand, Estates, farmhouse, farmland } from '@/CustomServices/Constant';

const PropertyByCategory = () => {
    const [search, setSearch] = useState("");
    const [propertyType, setPropertyTyppe] = useState("");
    const [propertyApproval, setPropertyApproval] = useState("");
    const {categoryId} = useParams();
    const {propertyName} = useParams();
  return (
     <>
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content">
                <h2 className="breadcrumb_title pb-3">{propertyName}</h2>
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
                  <div className="col-md-2">
                    <FormControl variant="outlined">
                      <InputLabel id=" ">
                        Property Type
                      </InputLabel>
                      <Select labelId="" label="Property Type" value={propertyType} onChange={(e) => setPropertyTyppe(e.target.value)} MenuProps={{
                        disableScrollLock: true,
                      }}>
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={farmhouse}>Farm House</MenuItem>
                        <MenuItem value={farmland}>Farm Land</MenuItem>
                        <MenuItem value={Estates}>Estates</MenuItem>
                        <MenuItem value={agricultureLand}>Agriculture Land</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-2">
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
                  <PropertyByCategoryTable search={search} propertyApproval={propertyApproval} propertyType={propertyType} categoryId={categoryId}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default PropertyByCategory