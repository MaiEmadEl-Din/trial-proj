import { Point } from '@angular/cdk/drag-drop';
export interface FormItem {
    id?: string;
    type: string;
    label?: string;
    icon: string;
    isHovering?: boolean;
    position?: Point;
    styleTabs?: ('default' | 'selected'| 'hover')[];
    props?: FormItemProps;
    styles?: FormItemStyles;
}

export interface FormItemProps {
    placeholder?: string;
    isRequired?: boolean;
    content?: string;
    options?: any[];
    minLength?: number;
    maxLength?: number;

    iconPreview?: string;
    iconFile?: File;
    iconPosition?: 'On Left' | 'On Right' | 'None';


    buttonText?: string;
    buttonType?: 'primary' | 'secondary' | 'outline';
    buttonAction?: 'submit' | 'reset' | 'button';

    apiValidation?: string;
    isMultiselect?: boolean;
    defaultValue?: string | boolean;

    dateType?: 'datetime' | 'date' | 'time';
    dateSelection?: 'specific' | 'range';
    timeSelection?: 'specific' | 'range';
    timeZone?: string;
    timeFormat?: '12h' | '24h';
    dateFormat?: string;

    maxFiles?: number;
    maxFileSize?: number;
    fileTypes?: string[];
    filesExceedLimitMessage?: string | null;

    [key: string]: any;
}

export interface FormItemStyles {
    enabled?: boolean;

    default?: Style;
    hover?: Style;
    selected?: Style;

    [key: string]: any;
}

export interface Style {
    backgroundColor?: string;
    color?: string;
    fontSize?: number | string;
    fontWeight?: string;
    fontFamily?: string;
    borderWidth?: number | string;
    borderRadius?: string;
    borderColor?: string;
    direction?: 'ltr' | 'rtl';
    [key: string]: any;
}

