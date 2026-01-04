import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Autocomplete, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { addPropertyCategoryApi, editPropertyCategoryAdmin } from '@/ApiRoutes/AdminApi';
import LoadingButton from '@mui/lab/LoadingButton';
import { toastMessage } from '@/CustomServices/ToastMessage';
import { useFormik } from 'formik';
import { capitalizeArray, formatNumberInCr } from '@/CustomServices/Constant';
import { useSelector } from 'react-redux';
import { selectFilter } from '@/features/properties/propertiesSlice';
import { propertyCategorySchema } from '../../AdminSchema/adminSchema';
import ShowError from '@/CustomCommon/Others/ShowError';

function AddCategoryModal({ open, handleClose, editData, getCategoryList }) {
    const [loader, setLoader] = useState(false);
    const { cities } = useSelector(selectFilter);
    const capitalizedCities = capitalizeArray(cities);
    const cityOptions = capitalizedCities.map(city => ({ city }));
    const keywords = ["newly", "recently", "latest" , "new" , "recent" , "recentl"];

    const initialValues = {
        name: "",
        order: "",
        price: "",
        propertyView: "",
        shortlistCount: "",
        city: [],
        days: "",
        count: ""
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues, resetForm, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: propertyCategorySchema,
        onSubmit: (values) => {
            if (editData) {
                updateCategory(values);
            } else {
                addCategory(values);
            }
        }
    });

    const [showDaysAndCount, setShowDaysAndCount] = useState(false);

    useEffect(() => {
        if (editData) {
            setValues(editData);
            setShowDaysAndCount(keywords.some(keyword => editData.name.toLowerCase().includes(keyword)));
        } else {
            resetForm();
            setShowDaysAndCount(false);
        }
    }, [editData, open]);


    const handleNumbersOnly = (e) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(e.target.value)) {
            setFieldValue(name, value);
        }
    };

    const handleCategoryChange = (e) => {
        handleChange(e);
        const checkKeyword = keywords?.some(keyword => e.target.value.toLowerCase().includes(keyword));
        setShowDaysAndCount(checkKeyword);
    };

    const addCategory = async (value) => {
        try {
            setLoader(true);
            const response = await addPropertyCategoryApi(value);
            handleClose();
            getCategoryList();
            resetForm();
        } catch (error) {
        } finally {
            setLoader(false);
        }
    };

    const updateCategory = async (value) => {
        try {
            setLoader(true);
            const response = await editPropertyCategoryAdmin(value);
            handleClose();
            getCategoryList();
        } catch (error) {
            toastMessage(error?.response?.status, error?.response?.data?.error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div>
            <React.Fragment>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="md"
                    disableScrollLock
                >
                    <DialogTitle id="alert-dialog-title">
                        {editData ? 'Edit' : 'Add'} Category
                    </DialogTitle>

                    <DialogContent className='p-3 mb-2'>
                        <form onSubmit={handleSubmit} className="row">
                            <div className="col-6 mb-3">
                                <TextField
                                    id="name"
                                    label="Category Name"
                                    variant="outlined"
                                    name="name"
                                    value={values.name}
                                    onChange={(e) => {
                                        handleCategoryChange(e);
                                        handleChange(e);
                                    }}
                                    onBlur={handleBlur}
                                />
                                <ShowError touched={touched.name} message={errors.name} />
                            </div>
                            <div className="col-6 mb-3">
                                <TextField
                                    id="order"
                                    label="Order"
                                    variant="outlined"
                                    name="order"
                                    value={values.order}
                                    onChange={handleNumbersOnly}
                                    onBlur={handleBlur}
                                />
                                <ShowError touched={touched.order} message={errors.order} />
                            </div>
                            <div className="col-6 mb-3" hidden={showDaysAndCount}>
                                <TextField
                                    id="price"
                                    label="Price"
                                    variant="outlined"
                                    name="price"
                                    value={values.price}
                                    onChange={handleNumbersOnly}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div className='fw-bold text-success fs-20'>{values.price && formatNumberInCr(values.price)}</div>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="col-6 mb-3" hidden={showDaysAndCount}>
                                <TextField
                                    id="propertyView"
                                    label="Property View"
                                    variant="outlined"
                                    name="propertyView"
                                    value={values.propertyView}
                                    onChange={handleNumbersOnly}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="col-6 mb-3" hidden={showDaysAndCount}>
                                <TextField
                                    id="shortlistCount"
                                    label="Shortlist Count"
                                    variant="outlined"
                                    name="shortlistCount"
                                    value={values.shortlistCount}
                                    onChange={handleNumbersOnly}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="col-6 mb-3" hidden={!showDaysAndCount}>
                                <TextField
                                    id="count"
                                    label="Numbers of Properties"
                                    variant="outlined"
                                    name="count"
                                    value={values.count}
                                    onChange={handleNumbersOnly}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="col-md-6 mb-3" hidden={!showDaysAndCount}>
                                <FormControl variant="outlined">
                                    <InputLabel id="days-label">
                                        No. of Days
                                    </InputLabel>
                                    <Select labelId="days-label" label="No. of Days" name="days" value={values.days} onChange={handleChange} MenuProps={{
                                        disableScrollLock: true,
                                    }}>
                                        <MenuItem value={"7"}>Last 7 Days</MenuItem>
                                        <MenuItem value={"15"}>Last 15 Days</MenuItem>
                                        <MenuItem value={"30"}>Last 30 Days</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-md-12 mb-3" hidden={showDaysAndCount}>
                                <Autocomplete
                                    multiple
                                    id="multiple-limit-tags"
                                    options={cityOptions}
                                    getOptionLabel={(option) => option.city}
                                    value={values?.city || []}
                                    onChange={(event, newValue) => {
                                        setValues({ ...values, city: newValue });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="City"
                                            placeholder="Select cities"
                                            onBlur={handleBlur}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <div className="text-end mt-2">
                                    <Button variant='outlined' color='warning' className='me-3' onClick={handleClose}>Close</Button>
                                    {editData ? (
                                        <LoadingButton disabled={!values.name} className="custom-dark" loading={loader} loadingIndicator="Saving..." variant="outlined" onClick={handleSubmit} type='submit'>
                                            Update
                                        </LoadingButton>
                                    ) : (
                                        <LoadingButton disabled={!values.name} className="custom-dark" loading={loader} loadingIndicator="Saving..." variant="outlined" onClick={handleSubmit} type='submit'>
                                            Submit
                                        </LoadingButton>
                                    )}
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div >
    );
}

export default AddCategoryModal;
