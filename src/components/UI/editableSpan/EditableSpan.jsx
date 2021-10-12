import {useState} from "react";
import MyInput from "../input/MyInput";

const SuperEditableSpan = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState(false);
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {};

    const onEnterCallback = () => {
        setEditMode(false); // выключить editMode при нажатии Enter

        onEnter && onEnter();
    };
    const onBlurCallback = (e) => {
        setEditMode(false); // выключить editMode при нажатии за пределами инпута
        onBlur && onBlur(e);
    };
    const onDoubleClickCallBack = (e) => {
        setEditMode(true); // включить editMode при двойном клике
        onDoubleClick && onDoubleClick(e);
    };

    // const spanClassName = s.span;
    // `${className}`

    return (
        <>
            {editMode
                ? (
                    <MyInput
                        autoFocus // пропсу с булевым значением не обязательно указывать true
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}

                        {...restProps}

                        // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                ) : (
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className

                        {...restSpanProps}
                    >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}
                        {children || restProps.value}
                    </span>
                )
            }
        </>
    );
}

export default SuperEditableSpan;