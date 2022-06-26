import {secondaryColor} from './Colors.js';

const BoxStyleVariants = {
    InputBoxes: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'center',
    },
    TextFieldBoxes: {
        width: "100%",
        height: "100%",
        color: 'secondary.main',
        borderColor: 'secondary.main',
        '& .MuiInputBase-input': {
                color: 'secondary.main',
            '&.Mui-disabled':{
                    color: '#fffff',
            }
        },

        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '15px',
            color: 'primary.light',
        },
        '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
            color: 'primary.light',
            backgroundColor: 'white',
            borderRadius: '15px',
        },
        '& label.Mui-focused': {
            color: 'primary.light',
            backgroundColor: 'primary.dark',
            borderRadius: '5px',

        },
        '& .MuiInput-underline:after': {
            borderColor: 'primary.light',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
        },
        '& .MuiFormLabel-root':{
            color: 'secondary.main'
        }
    },
    CheckBoxes: {
        '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
            color: secondaryColor,
        }
    }
};

export default BoxStyleVariants;
