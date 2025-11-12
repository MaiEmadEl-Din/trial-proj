import { Point } from '@angular/cdk/drag-drop';


export interface FormItem {
    id?: string;
    type: string;
    label?: string;
    icon: string;
    isHovering?: boolean;
    position?: Point;

    props?: FormItemProps;
    styles?: FormItemStyles;
}

export interface FormItemProps {
    placeholder?: string;
    required?: boolean;
    content?: string;
    options?: any[];
    maxLength?: number;

    iconPreview?: string;
    iconFile?: File;
    iconPosition?: 'On Left' | 'On Right' | 'None';

    buttonText?: string;
    buttonType?: 'primary' | 'secondary' | 'outline';
    type?: 'submit' | 'reset' | 'button';

    apiValidation?: string;
    multiselect?: boolean;
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
    backgroundColor?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number | string;
    color?: string;
    rows?: number;
    enabled?: boolean;
    direction?: 'ltr' | 'rtl';

    borderWidth?: number | string;
    borderRadius?: string;
    borderColor?: string;

    hover?: HoverStyle;
    selected?: HoverStyle;

    [key: string]: any;
}

export interface HoverStyle {
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
