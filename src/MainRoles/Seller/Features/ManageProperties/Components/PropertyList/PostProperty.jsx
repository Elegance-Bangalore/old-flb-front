import React from 'react'
import SidebarMenu from "@/components/common/header/dashboard/SidebarMenu";
import MobileMenu from '@/components/common/header/MobileMenu';
import Header from '@/components/common/header/dashboard/Header';
import { FormControl, FormControlLabel, Switch, TextField, InputLabel, MenuItem, Select, Autocomplete, Checkbox, FormGroup } from '@mui/material';
import editIcon from "@/public/assets/images/profile/profile-edit.svg";
import deleteIcon from "@/public/assets/images/profile/delete-profile.svg";
import proptery from "@/public/assets/images/manage-property/property.png";
import logo from "@/public/assets/images/profile/upload-img.png";
import upload from "@/public/assets/images/profile/upload.png";
import uploadVideo from "@/public/assets/images/profile/upload-video.png";
import uploadDocument from "@/public/assets/images/profile/document-upload.png";
import close from "@/public/assets/images/icons/close-circle.svg";
import cloud from "@/public/assets/images/property-icon/cloud-fog.svg"
import driving from "@/public/assets/images/property-icon/driving.svg"
import drop from "@/public/assets/images/property-icon/drop.svg"
import flash from "@/public/assets/images/property-icon/flash.svg"
import happy from "@/public/assets/images/property-icon/happy.svg"
import house from "@/public/assets/images/property-icon/house.svg"
import shield from "@/public/assets/images/property-icon/shield.svg"
import star from "@/public/assets/images/property-icon/star.svg"
import trash from "@/public/assets/images/property-icon/trash.svg"
import tree from "@/public/assets/images/property-icon/tree.svg"


const PostProperty = () => {

    const data1 = [
        { label: "Sold", },
        { label: "Unsold", },
    ]
    const data2 = [
        { label: "In Active", },
        { label: "Active", },
    ]

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>
            {/* <!-- Main Header Nav --> */}
            <Header />
            
            <MobileMenu />

            <div className="dashboard_sidebar_menu">
                <div
                    className="offcanvas offcanvas-dashboard offcanvas-start"
                    tabIndex="-1"
                    id="DashboardOffcanvasMenu"
                    data-bs-scroll="true"
                >
                    <SidebarMenu />
                </div>
            </div>
            <section className="our-dashbord dashbord mt-5">
                <div className="container-fluid ovh">
                    <div className="row pb-5">
                        <div className="col-xxl-12">
                            <div className="breadcrumb_content">
                                <h2 className="breadcrumb_title">Add Property  </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Start unveiling</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
                                <h4 className="mb-3">Select Property Type </h4>
                                <ul className="nav nav-pills mb-3 property-nav-tab-list border mb-5" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-farmland-tab" data-bs-toggle="pill" data-bs-target="#pills-farmland" type="button" role="tab" aria-controls="pills-farmland" aria-selected="true">Farmland</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-farmhouse-tab" data-bs-toggle="pill" data-bs-target="#pills-farmhouse" type="button" role="tab" aria-controls="pills-farmhouse" aria-selected="false">Farmhouse</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-coffee-estate-tab" data-bs-toggle="pill" data-bs-target="#pills-coffee-estate" type="button" role="tab" aria-controls="pills-coffee-estate" aria-selected="false">Coffee Estate</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-agriculture-land-tab" data-bs-toggle="pill" data-bs-target="#pills-agriculture-land" type="button" role="tab" aria-controls="pills-agriculture-land" aria-selected="false">Agriculture Land</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-farmland" role="tabpanel" aria-labelledby="pills-farmland-tab">
                                        <h4 className="mb-4">Property Details</h4>
                                        <div className="row">
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Name"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="State"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <div className="file-upload">
                                                        <img
                                                            className="img-fluid uploaded-image"
                                                            src={logo}
                                                            alt="Logo"
                                                        />
                                                        <div className="upload-icon">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="btn btn-profile-edit d-inline-block"
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={editIcon}
                                                                    alt="editIcon"
                                                                />
                                                            </label>
                                                            <span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-profile-delete d-inline-block"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={deleteIcon}
                                                                        alt="deleteIcon"
                                                                    />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <TextField
                                                        type="file"
                                                        id="file-upload"
                                                        variant="outlined"
                                                        hidden
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="City"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Locality"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Paste Google Map Embed Link"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Description"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-farmhouse" role="tabpanel" aria-labelledby="pills-farmhouse-tab">
                                        <h4 className="mb-4">Property Details</h4>
                                        <div className="row">
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Name"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="State"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <div className="file-upload">
                                                        <img
                                                            className="img-fluid uploaded-image"
                                                            src={logo}
                                                            alt="Logo"
                                                        />
                                                        <div className="upload-icon">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="btn btn-profile-edit d-inline-block"
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={editIcon}
                                                                    alt="editIcon"
                                                                />
                                                            </label>
                                                            <span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-profile-delete d-inline-block"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={deleteIcon}
                                                                        alt="deleteIcon"
                                                                    />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <TextField
                                                        type="file"
                                                        id="file-upload"
                                                        variant="outlined"
                                                        hidden
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="City"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Locality"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Paste Google Map Embed Link"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Description"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-coffee-estate" role="tabpanel" aria-labelledby="pills-coffee-estate-tab">
                                        <h4 className="mb-4">Property Details</h4>
                                        <div className="row">
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Name"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="State"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <div className="file-upload">
                                                        <img
                                                            className="img-fluid uploaded-image"
                                                            src={logo}
                                                            alt="Logo"
                                                        />
                                                        <div className="upload-icon">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="btn btn-profile-edit d-inline-block"
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={editIcon}
                                                                    alt="editIcon"
                                                                />
                                                            </label>
                                                            <span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-profile-delete d-inline-block"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={deleteIcon}
                                                                        alt="deleteIcon"
                                                                    />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <TextField
                                                        type="file"
                                                        id="file-upload"
                                                        variant="outlined"
                                                        hidden
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="City"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Locality"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Paste Google Map Embed Link"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Description"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-agriculture-land" role="tabpanel" aria-labelledby="pills-agriculture-land-tab">
                                        <h4 className="mb-4">Property Details</h4>
                                        <div className="row">
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Name"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="State"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <div className="file-upload">
                                                        <img
                                                            className="img-fluid uploaded-image"
                                                            src={logo}
                                                            alt="Logo"
                                                        />
                                                        <div className="upload-icon">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="btn btn-profile-edit d-inline-block"
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={editIcon}
                                                                    alt="editIcon"
                                                                />
                                                            </label>
                                                            <span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-profile-delete d-inline-block"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={deleteIcon}
                                                                        alt="deleteIcon"
                                                                    />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <TextField
                                                        type="file"
                                                        id="file-upload"
                                                        variant="outlined"
                                                        hidden
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="City"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Locality"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Paste Google Map Embed Link"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Property Description"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Additional Property Details</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
                                <div className="row">
                                    <div className="col-xxl-6">
                                        <h4 className="mb-4">Property Dimensions</h4>
                                        <div className="row">
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Total Property Area"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <div className="btn-frame mb-4">
                                                    <input id="toggle-on" className="toggle toggle-left" name="toggle" value="false" type="radio" defaultChecked hidden />
                                                    <label htmlFor="toggle-on" className="btn-pri left" >Sq.Ft</label>
                                                    <input id="toggle-off" className="toggle toggle-right" name="toggle" value="true" type="radio" hidden />
                                                    <label htmlFor="toggle-off" className="btn-pri right">Acres</label>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Length (Optional)"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-6">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Breadth (Optional)"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <h4 className="mb-4">Property Price</h4>
                                        <div className="row">
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Total Property Price"
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-xxl-12">
                                                <FormControl className="mb-4">
                                                    <TextField
                                                        id=""
                                                        label="Price per Sq.ft."
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-xxl-6">
                                        <div className="row align-items-center mb-4">
                                            <div className="col-xxl-3">
                                                <h4 className="mb-3 mb-xxl-0 font-mid-screen-1">Open Sides</h4>
                                            </div>
                                            <div className="col-xxl-9">
                                                <div className="btn-frame open-sides-tab" style={{ width: "fit-content" }}>
                                                    <input id="toggle-on-1" className="toggle-new toggle-left-new" name="toggle_new" value="false" type="radio" defaultChecked hidden />
                                                    <label htmlFor="toggle-on-1" className="btn-pri-new left-new">1</label>
                                                    <input id="toggle-off-2" className="toggle-new toggle-middle-new" name="toggle_new" value="true" type="radio" hidden />
                                                    <label htmlFor="toggle-off-2" className="btn-pri-new middle">2</label>
                                                    <input id="toggle-off-3" className="toggle-new toggle-middle-new" name="toggle_new" value="true" type="radio" hidden />
                                                    <label htmlFor="toggle-off-3" className="btn-pri-new middle-new">3</label>
                                                    <input id="toggle-off-4" className="toggle-new toggle-right-new" name="toggle_new" value="true" type="radio" hidden />
                                                    <label htmlFor="toggle-off-4" className="btn-pri-new right-new">4+</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-xxl-3">
                                                <h4 className="mb-xxl-0 mb-3 font-mid-screen-1">Possession</h4>
                                            </div>
                                            <div className="col-xxl-9">
                                                <div className="btn-frame mb-4 mb-xxl-0">
                                                    <input id="toggle-on-possession-1" className="toggle-possession toggle-left-possession" name="toggle_possession" value="false" type="radio" defaultChecked hidden />
                                                    <label htmlFor="toggle-on-possession-1" className="btn-pri left-possession" >Immediate</label>
                                                    <input id="toggle-off-possession-1" className="toggle-possession toggle-right-possession" name="toggle_possession" value="true" type="radio" hidden />
                                                    <label htmlFor="toggle-off-possession-1" className="btn-pri right-possession">Future</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="bg-border-light-green swtich-container mb-4 ">
                                                    <FormControlLabel
                                                        control={
                                                            <Switch defaultChecked />}
                                                        label="Property is RERA Approved"
                                                        labelPlacement="start"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="bg-border-light-gray swtich-container mb-3">
                                                    <FormControlLabel
                                                        control={
                                                            <Switch defaultChecked />}
                                                        label="Price is Negotiable"
                                                        labelPlacement="start"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <FormControl className="mb-4 proptery-date">
                                            <TextField id="" variant="outlined" type="date" />
                                        </FormControl>
                                    </div>
                                    <div className="col-xxl-6">
                                        <div className="bg-border-light-gray swtich-container mb-3">
                                            <FormControlLabel
                                                control={
                                                    <Switch defaultChecked />}
                                                label="Property has Boundary Walls"
                                                labelPlacement="start"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Choose Property Amenities</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
                                <FormGroup>
                                    <div className="row">
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-green swtich-container mb-4 ">
                                                <img src={drop} alt="icon" />
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Water Supply" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-green swtich-container mb-4 ">
                                                <img src={flash} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Electricity" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-gray-green swtich-container mb-4 ">
                                                <img src={shield} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Security Guard" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-gray swtich-container mb-4 ">
                                                <img src={cloud} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Swiming Pool" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-green swtich-container mb-4 ">
                                                <img src={trash} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Sewage" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-green swtich-container mb-4 ">
                                                <img src={happy} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Kids Play Area" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-green swtich-container mb-4 ">
                                                <img src={tree} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Garden" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-gray swtich-container mb-4 ">
                                                <img src={driving} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Internal Road" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-green swtich-container mb-4 ">
                                                <img src={house} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="Club House" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-gray swtich-container mb-4 ">
                                                <img src={star} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="New Item" labelPlacement="start" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xxl-4">
                                            <div className="bg-border-light-gray swtich-container mb-4 ">
                                                <img src={star} alt="icon" />
                                                <FormControlLabel control={<Checkbox style={{ visibility: "hidden" }} />} label="New Item" labelPlacement="start" />
                                            </div>
                                        </div>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Uploads</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper pb-4 pt-2 rounded-3 border">
                                <div className="manage_enqury property-manage_enqury">
                                    <div className="border__">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active px-0" id="featured-tab" data-bs-toggle="tab" data-bs-target="#featured" type="button" role="tab" aria-controls="featured" aria-selected="true">Featured Image</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="gallery-tab" data-bs-toggle="tab" data-bs-target="#gallery" type="button" role="tab" aria-controls="gallery" aria-selected="false">Gallery</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="master-tab" data-bs-toggle="tab" data-bs-target="#master" type="button" role="tab" aria-controls="master" aria-selected="false">Master Plan</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="featured" role="tabpanel" aria-labelledby="featured-tab">
                                            <div className="px-4 mt-4">
                                                <FormControl className="mb-4">
                                                    <label htmlFor="feature-file-upload">
                                                        <div className="file-upload border-dash d-flex justify-content-center align-items-end flex-row" style={{ height: "20rem" }}>
                                                            <div className="text-center">
                                                                <img className="img-fluid mb-3 post-upload-image" src={upload} alt="upload" />
                                                                <h3>Drop or Select Image</h3>
                                                                <h4 className="mb-5 fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h4>
                                                                <p className="text-gray fs-16">Only 1 Image  |  Max. 10 MB | Formats: jpg, jpeg, png </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <TextField
                                                        type="file"
                                                        id="feature-file-upload"
                                                        variant="outlined"
                                                        hidden
                                                    />
                                                </FormControl>
                                                <div className="feature-preview-img-list-wrapper">
                                                    <div className="feature-preview-img-list d-flex justify-content-between mb-4">
                                                        <div className="feature-preview-img position-relative">
                                                            <button className="btn p-0 border-0 position-absolute position-absolute top-0 end-0"><img src={close} className="img-fluid" style={{ width: "3rem" }} /></button>
                                                            <div className="properties-image">
                                                                <img src={proptery} alt="property-img" className="img-fluid aspect-1-1 rounded-3" style={{ width: "10rem" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bottom-feature-buttons text-end">
                                                        <button className="btn btn-outline-black rounded-btn mx-3">CLEAR</button>
                                                        <button className="btn btn-black rounded-btn">UPLOAD</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="gallery" role="tabpanel" aria-labelledby="gallery-tab">
                                            <div className="row px-4 mt-4">
                                                <div className="col-xxl-6">
                                                    <FormControl className="mb-4">
                                                        <label htmlFor="gallery-file-upload">
                                                            <div className="file-upload border-dash d-flex justify-content-center align-items-end flex-row" style={{ height: "26.6rem" }}>
                                                                <div className="text-center">
                                                                    <img className="img-fluid mb-3 post-upload-image" src={upload} alt="upload" />
                                                                    <h3>Drop or Select Image</h3>
                                                                    <h4 className="mb-5 fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h4>
                                                                    <p className="text-gray fs-16">Only 1 Image  |  Max. 10 MB | Formats: jpg, jpeg, png </p>
                                                                </div>
                                                            </div>
                                                        </label>
                                                        <TextField
                                                            type="file"
                                                            id="gallery-file-upload"
                                                            variant="outlined"
                                                            hidden
                                                        />
                                                    </FormControl>
                                                    <div className="gallery-preview-img-list-wrapper d-none">
                                                        <div className="gallery-preview-img-list d-flex justify-content-between mb-4">
                                                            <div className="gallery-preview-img position-relative">
                                                                <button className="btn p-0 border-0 position-absolute position-absolute top-0 end-0 h-100"><img src={close} className="img-fluid" style={{ width: "3rem" }} /></button>
                                                                <div className="properties-image">
                                                                    <img src={proptery} alt="property-img" className="img-fluid aspect-1-1 rounded-3" style={{ width: "10rem" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bottom-gallery-buttons text-end">
                                                            <button className="btn btn-outline-black rounded-btn mx-3">CLEAR</button>
                                                            <button className="btn btn-black rounded-btn">UPLOAD</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-6">
                                                    <div>
                                                        <FormControl className="">
                                                            <TextField id="" label="Paste YouTube Video Link" variant="outlined" />
                                                        </FormControl>
                                                    </div>
                                                    <div className="text-center my-3">
                                                        <h5 className="text-gray fw-semi-bold mb-0">Or</h5>
                                                    </div>
                                                    <div>
                                                        <FormControl className="mb-4">
                                                            <label htmlFor="video-file-upload">
                                                                <div className="file-upload border-dash d-flex justify-content-center align-items-end flex-row" style={{ height: "20rem" }}>
                                                                    <div className="text-center">
                                                                        <img className="img-fluid mb-3 post-upload-image" src={uploadVideo} alt="video" />
                                                                        <h3>Drop or Select Video</h3>
                                                                        <h4 className="mb-5 fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h4>
                                                                        <p className="text-gray fs-16">Only 1 Video  |  Max. 200 MB | Formats: mp4, wmv, avi </p>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <TextField
                                                                type="file"
                                                                id="video-file-upload"
                                                                variant="outlined"
                                                                hidden
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="master-preview-img-list-wrapper">
                                                        <div className="master-preview-img-list d-flex justify-content-between mb-4">
                                                            <div className="master-preview-img position-relative">
                                                                <button className="btn p-0 border-0 position-absolute position-absolute top-0 end-0"><img src={close} className="img-fluid" style={{ width: "3rem" }} /></button>
                                                                <div className="properties-image">
                                                                    <img src={proptery} alt="property-img" className="img-fluid aspect-1-1 rounded-3" style={{ width: "10rem" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bottom-master-buttons text-end">
                                                            <button className="btn btn-outline-black rounded-btn mx-3">CLEAR</button>
                                                            <button className="btn btn-black rounded-btn">UPLOAD</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="master" role="tabpanel" aria-labelledby="master-tab">
                                            <div className="px-4 mt-4">
                                                <FormControl className="mb-4">
                                                    <label htmlFor="master-file-upload">
                                                        <div className="file-upload border-dash d-flex justify-content-center align-items-end flex-row" style={{ height: "20rem" }}>
                                                            <div className="text-center">
                                                                <img className="img-fluid mb-3 post-upload-image" src={upload} alt="upload" />
                                                                <h3>Drop or Select Image</h3>
                                                                <h4 className="mb-5 fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h4>
                                                                <p className="text-gray fs-16">Only 1 Image  |  Max. 10 MB | Formats: jpg, jpeg, png </p>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <TextField
                                                        type="file"
                                                        id="master-file-upload"
                                                        variant="outlined"
                                                        hidden
                                                    />
                                                </FormControl>
                                                <div className="master-preview-img-list-wrapper">
                                                    <div className="master-preview-img-list d-flex justify-content-between mb-4">
                                                        <div className="master-preview-img position-relative">
                                                            <button className="btn p-0 border-0 position-absolute position-absolute top-0 end-0"><img src={close} className="img-fluid" style={{ width: "3rem" }} /></button>
                                                            <div className="properties-image">
                                                                <img src={proptery} alt="property-img" className="img-fluid aspect-1-1 rounded-3" style={{ width: "10rem" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bottom-master-buttons text-end">
                                                        <button className="btn btn-outline-black rounded-btn mx-3">CLEAR</button>
                                                        <button className="btn btn-black rounded-btn">UPLOAD</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Verify Your Property</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
                                <h4 className="mb-3">Select Preferred mode of Verification</h4>
                                <ul className="nav nav-pills mb-3 property-nav-tab-list border mb-5" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-maintenance-tab" data-bs-toggle="pill" data-bs-target="#pills-maintenance" type="button" role="tab" aria-controls="pills-maintenance" aria-selected="true">Property Maintenance Bill</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-papers-tab" data-bs-toggle="pill" data-bs-target="#pills-papers" type="button" role="tab" aria-controls="pills-papers" aria-selected="false">Property Papers </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-maintenance" role="tabpanel" aria-labelledby="pills-maintenance-tab">
                                        <div className="">
                                            <FormControl className="mb-4">
                                                <label htmlFor="master-file-upload">
                                                    <div className="file-upload border-dash d-flex justify-content-center align-items-end flex-row" style={{ height: "20rem" }}>
                                                        <div className="text-center">
                                                            <img className="img-fluid mb-3 post-upload-image" src={uploadDocument} alt="Document" />
                                                            <h3>Drop your documents here</h3>
                                                            <h4 className="mb-5 fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h4>
                                                           
                                                        </div>
                                                    </div>
                                                </label>
                                                <TextField
                                                    type="file"
                                                    id="master-file-upload"
                                                    variant="outlined"
                                                    hidden
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-papers" role="tabpanel" aria-labelledby="pills-papers-tab">
                                        <div className="">
                                            <FormControl className="mb-4">
                                                <label htmlFor="master-file-upload">
                                                    <div className="file-upload border-dash d-flex justify-content-center align-items-end flex-row" style={{ height: "20rem" }}>
                                                        <div className="text-center">
                                                            <img className="img-fluid mb-3 post-upload-image" src={uploadDocument} alt="Document" />
                                                            <h3>Drop your documents here</h3>
                                                            <h4 className="mb-5 fw-semi-bold">Drop here or click <span className="text-green fw-bold">browse</span> to select</h4>
                                                        </div>
                                                    </div>
                                                </label>
                                                <TextField
                                                    type="file"
                                                    id="master-file-upload"
                                                    variant="outlined"
                                                    hidden
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Status and Availability</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
                                <div className="row">
                                    <div className="col-xxl-6">
                                        {/* <FormControl variant="outlined">
                                            <InputLabel id=" ">
                                                Property Type
                                            </InputLabel>
                                            <Select labelId="" label="Availability">
                                                <MenuItem value="">In Active</MenuItem>
                                            </Select>
                                        </FormControl> */}
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo" className="mb-4 mb-xxl-0"
                                            options={data2}
                                            renderInput={(params) => <TextField {...params} label="Availability" />}
                                        />
                                    </div>
                                    <div className="col-xxl-6">
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={data1}
                                            renderInput={(params) => <TextField {...params} label="Status" />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-xxl-4">
                            <h3>Set Category</h3>
                            <p className="fs-18 text-gray">Lorem ipsum dolor sit amet consec Venenatis.</p>
                        </div>
                        <div className="col-xxl-8">
                            <div className="bg-white-shadow select-property-wrapper p-4 rounded-3 border">
                                <div className="row">
                                    <div className="col-xxl-6">
                                        <div className="bg-border-light-green swtich-container mb-4 ">
                                            <FormControlLabel
                                                control={
                                                    <Switch defaultChecked />}
                                                label="Highly Recommended"
                                                labelPlacement="start"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <div className="bg-border-light-gray swtich-container mb-4 ">
                                            <FormControlLabel
                                                control={
                                                    <Switch defaultChecked />}
                                                label="Hot Property"
                                                labelPlacement="start"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <div className="bg-border-light-gray swtich-container ">
                                            <FormControlLabel
                                                control={
                                                    <Switch defaultChecked />}
                                                label="Elite Property"
                                                labelPlacement="start"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 text-end">
                        <button className="btn btn-black rounded-btn">SUBMIT</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PostProperty