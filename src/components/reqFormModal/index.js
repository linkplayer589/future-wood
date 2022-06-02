import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, Button, Divider, IconButton, TextareaAutosize, TextField, InputAdornment } from '@mui/material';
import noOilingIcon from "../../images/no-oiling-icon.png"
import noRotIcon from "../../images/no-rot-icon.png"
import noWorriesIcon from "../../images/no-worries-icon.png"
import warrentyIcon from "../../images/warranty_icon.png";
// import IconTextField from '../IconTextField';
import { Check, CancelRounded, HighlightOff, Cancel } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { phoneRegExp } from '../../utils/phoneReg';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '70%',
        height: '100%',
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%'
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        position: 'relative',
        flex: 1,
        height: '100%',
        width: '80%',
        overflow: 'scroll'
    },
    modalHeaderWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerImg: {
        width: 30,
        height: 30
    },
    headerText: {
        color: 'black',
        marginLeft: '1em'
    },
    textFieldsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between'
    },
    textArea: {
        width: '100%',
        height: '12%',
        marginTop: '1em'
    },
    infoText: {
        fontSize: '0.85rem',
        color: '#a0a0a0'
    },
    footerWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1em'
    },
    warrentyContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1em'
    },
    warrentyText: {
        fontSize: '0.85rem',
        borderBottomStyle: 'dotted',
        marginLeft: '1em'
    },
    firstIconTextFields: {
        width: '47%',
        marginTop: '2em',
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
            marginTop: '1em'
        }
    },
    secondIconTextField: {
        width: '47%',
        marginTop: '1em',
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
            marginTop: '1em'
        }
    },
    headerTitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

export default function ReqFormModal({ isModalOpen, setIsModalOpen }) {
    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState('');

    const classes = useStyles();

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field")
        ,
        email: yup
            .string()
            .email()
            .required("Email is a required field")
        ,
        city: yup
            .string()
            .required("City is a required field")
        ,
        phoneNumber: yup
            .string()
            .required('Phone number is a required field')
            .matches(phoneRegExp, 'Phone number is not valid')
        ,
        refFiles: yup
            .mixed()
            .test("fileSize", "The file is too large", (value) => {
                // return value && value[0].size <= 20000000
                console.log({ value })
            })
    })

    const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    // You can get whole form data after submission
    const onClick = (data) => {
        // console.log(data);
        console.log({ dirtyFields, errors })
    }

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleFilesUpload = (evt) => {
        evt.preventDefault();
        const evtFiles = evt.target.files
        // Object.values({ ...evtFiles }).map(value => {
        //     if (value > 5000000) {
        //         return setFileError(value.name, 'file size must be less than 5Mbs')
        //     }
        // })
        setFiles([...evtFiles])
    }

    const handleFileDelete = (name) => {
        let remainingFiles = files.filter((file) => file.name !== name);
        setFiles(remainingFiles);
    }


    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <IconButton aria-label="delete-button" onClick={handleClose} style={{ position: 'absolute', right: '0.5em', top: '1em' }}>
                            <CancelRounded />
                        </IconButton>
                        <div className={classes.headerTitleContainer}>
                            <h2>HOW CAN WE HELP YOU?</h2>
                            <p>Your request will be typically answered within the next 24 hours</p>
                        </div>
                        <div className={classes.modalHeaderWrapper}>

                            <div className={classes.modalHeaderContainer}>
                                <img className={classes.headerImg} src={noOilingIcon} alt="No Oiling Icon" />
                                <h4 className={classes.headerText}>No Oiling</h4>
                            </div>

                            <div className={classes.modalHeaderContainer}>
                                <img className={classes.headerImg} src={noRotIcon} alt="No Rot Icon" />
                                <h4 className={classes.headerText}>No Rot</h4>
                            </div>

                            <div className={classes.modalHeaderContainer}>
                                <img className={classes.headerImg} src={noWorriesIcon} alt="No Worries Icon" />
                                <h4 className={classes.headerText}>No Worries</h4>
                            </div>
                        </div>

                        <Divider />

                        <div className={classes.textFieldsContainer}>

                            <TextField
                                {...register('name', { required: true })}
                                name="name"
                                variant="outlined"
                                required
                                label="ENTER YOUR NAME"
                                className={classes.firstIconTextFields}
                                error={!!errors.name}
                                helperText={errors?.name?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                {(dirtyFields?.name && !errors.name) && <Check color="success" />}
                                                {errors?.name && <Cancel color="error" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                {...register('email', { required: true })}
                                name="email"
                                variant="outlined"
                                label="ENTER YOUR EMAIL ADDRESS"
                                required
                                className={classes.firstIconTextFields}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                {(dirtyFields?.email && !errors.email) && <Check color="success" />}
                                                {errors?.email && <Cancel color="error" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                {...register('phoneNumber', { required: true })}
                                variant="outlined"
                                name="phoneNumber"
                                label="ENTER YOUR PHONE NUMBER"
                                required
                                className={classes.secondIconTextField}
                                error={!!errors.phoneNumber}
                                helperText={errors?.phoneNumber?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                {(dirtyFields?.phoneNumber && !errors.phoneNumber) && <Check color="success" />}
                                                {errors?.phoneNumber && <Cancel color="error" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                {...register('city', { required: true })}
                                name="city"
                                variant="outlined"
                                label="ENTER YOUR CITY OR POSTCODE"
                                required
                                className={classes.secondIconTextField}
                                error={!!errors.city}
                                helperText={errors?.city?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                {(dirtyFields?.city && !errors.city) && <Check color="success" />}
                                                {errors?.city && <Cancel color="error" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <TextareaAutosize
                            {...register('message', { required: true })}
                            name="message"
                            maxRows={8}
                            placeholder="ENTER YOUR MESSAGE"
                            style={{
                                width: '100%',
                                height: '12vh',
                                marginTop: '1em'
                            }}

                        />

                        <div style={{ width: '90%' }}>
                            <p className={classes.infoText}>Please feel free to upload additional information such as plans, photos etc. (jpg, gif, png, pdf, doc. Max. upload size: 5MB.)</p>
                        </div>

                        <div className={classes.footerWrapper}>
                            <Button
                                component="label"
                                variant="contained"
                                style={{ backgroundColor: '#00a651', color: '#fff', width: '60%', height: '3em' }}>
                                SELECT FILES
                                <input
                                    {...register('refFiles', { required: true })}
                                    name="refFiles"
                                    // ref={register}
                                    type="file"
                                    multiple
                                    hidden
                                    onChange={handleFilesUpload}
                                />
                            </Button>

                            {fileError && <p>{fileError}</p>}

                            {files.length > 0 && files.map((file, idx) => (
                                <div key={idx}>
                                    <IconButton onClick={() => handleFileDelete(file.name)}>
                                        <HighlightOff />
                                    </IconButton>
                                    <div>{file.name}</div>
                                </div>
                            ))}

                            <div>
                                <p className={classes.infoText}>Accepted file types: jpg, gif, png, pdf, doc, Max. file size: 10 MB, Max. files: 10.</p>
                            </div>

                            <Button variant="contained"
                                onClick={handleSubmit(onClick)}
                                style={{ backgroundColor: '#00a651', color: '#fff', width: '80%', height: '3em' }}>
                                ENQUIRE NOW
                            </Button>

                            <div className={classes.warrentyContainer}>
                                <img style={{ width: 30, height: 30 }} src={warrentyIcon} alt="warrenty icon" />
                                <p className={classes.warrentyText}>No fuss-unmatched warranty*</p>
                            </div>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}