import classes from './SettingsItem.module.scss';

import {
    IconComponentType,
    IconKeyType,
    getIconComponent,
} from '../../../assets/icons';
import { ReactNode, useEffect } from 'react';
import Alert, { AlertType } from '../../../components/generic/Alert';

interface BaseSettingsItemProps {
    label: string;
    iconKey: IconKeyType;
    alert?: AlertType | null;
    onAlertRemove?: () => void;
    onClick?: () => void;
}

interface ValueProps extends BaseSettingsItemProps {
    value?: string;
    children?: never;
}

interface ChildrenProps extends BaseSettingsItemProps {
    children: ReactNode;
    value?: never;
}

type SettingsItemProps = ValueProps | ChildrenProps;

const SettingsItem = ({
    label,
    value,
    children,
    iconKey,
    alert,
    onAlertRemove,
    onClick,
}: SettingsItemProps) => {
    const IconComponent: IconComponentType = getIconComponent(iconKey);

    useEffect(() => {
        if (!alert || !onAlertRemove) return;
        setTimeout(onAlertRemove, 5000);
    }, [alert]);

    return (
        <div className={classes.row} onClick={onClick}>
            <IconComponent size={24} />
            <div className={classes.label}>{label}</div>
            <div className={classes.content}>{children || value}</div>

            {alert && (
                <Alert
                    className={classes.alert}
                    severity={alert.severity}
                    title={alert.title}
                    description={alert.description}
                />
            )}
        </div>
    );
};

export default SettingsItem;