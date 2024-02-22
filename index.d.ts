import * as React from "react";

export interface EditableLabelProps {
    initialValue: string;
    save: (value: string) => void;
    disableKeys?: boolean;
    inputClass?: string;
    labelClass?: string;
    inputName?: string;
    inputId?: string;
}

declare const EditableLabel: React.ComponentType<EditableLabelProps>;
export default EditableLabel;