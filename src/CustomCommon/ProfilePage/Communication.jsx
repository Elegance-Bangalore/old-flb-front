import React, { useState } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import smsNotify from "@/public/assets/images/profile/sms-notification.svg";
import msg from "@/public/assets/images/profile/message-notif.svg";
import whatsapp from "@/public/assets/images/profile/whatsapp-pro.svg";

function Communication({ formik }) {

    const [checkedValues, setCheckedValues] = useState([]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
    } = formik

    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setCheckedValues([...checkedValues, name]);
            let data = [...checkedValues, name];
            setFieldValue("notification", data);
        } else {
            setCheckedValues(checkedValues.filter((value) => value !== name));
            setFieldValue(
                "notification",
                checkedValues.filter((value) => value !== name)
            );
        }
    };

    return (
        <div className="col-12">
            <h4 className="text-medium-grey text-uppercase mt-3 mb-4">
                Communication Preferences
            </h4>
            <div className="row">
                <div className="col-md-6">
                    <div className={`${values?.notification?.includes(
                        "email"
                    ) && "bg-border-light-green"} swtich-container mb-3 `}>
                        <img src={smsNotify} alt="icon" />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values?.notification?.includes(
                                        "email"
                                    )}
                                    onChange={handleSwitchChange}
                                    name="email"
                                />
                            }
                            label="Get updates on Email"
                            labelPlacement="start"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={`${values?.notification?.includes(
                        "text"
                    ) && "bg-border-light-green"} swtich-container mb-3 `}>
                        <img src={msg} alt="icon" />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values?.notification?.includes(
                                        "text"
                                    )}
                                    onChange={handleSwitchChange}
                                    name="text"
                                    disabled
                                />
                            }
                            label="Get updates on SMS"
                            labelPlacement="start"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={`${values?.notification?.includes(
                        "whatsapp"
                    ) && "bg-border-light-green"} swtich-container mb-3 `}>
                        <img src={whatsapp} alt="icon" />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values?.notification?.includes(
                                        "whatsapp"
                                    )}
                                    onChange={handleSwitchChange}
                                    name="whatsapp"
                                    disabled
                                />
                            }
                            label="Get updates on WhatsApp"
                            labelPlacement="start"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Communication