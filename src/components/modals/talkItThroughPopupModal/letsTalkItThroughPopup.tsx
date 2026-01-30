import { useForm } from "react-hook-form";
import styles from "./letsTalkItThroughPopup.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { contactUsAPI } from "@/redux/services/general.api";
import toast from "react-hot-toast";
interface LetsTalkItThroughPopupProps {
  setDisableScroll: (value: boolean) => void;
  setIsTalkItThrough: (value: boolean) => void;
}

const letsTalkSchema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name."),
  email: yup.string().email('Enter a valid email.').required('Email field is required.'),
  phone: yup.string().matches(
    /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
    'Please provide a valid UK contact number.').required('Contact number field is required.'),


})
const LetsTalkItThroughPopup = (props: LetsTalkItThroughPopupProps) => {
  const { setDisableScroll, setIsTalkItThrough } = props;
  const { register, formState: { errors }, handleSubmit, reset } = useForm({ resolver: yupResolver(letsTalkSchema) })
  const [, setIsLoading] = useState(false);
  useEffect(() => {
    setDisableScroll(true)

  }, [])

  const onSubmit = async (
    data: any,
    e: any
  ) => {
    e.preventDefault();
    if (data) {
      const toastId = toast.loading('Saving Data, Please Wait!')
      setIsLoading(true);
      try {
        await contactUsAPI(data);
        setIsLoading(false);
        toast.success(
          'Thank you! Your message has been successfully sent.We will contact you very soon!', { id: toastId }
        );
        reset();
      } catch (error) {
        toast.error('Error Occurred Please Try Again!', { id: toastId })
        setIsLoading(false);
      }
      finally {
        setIsTalkItThrough(false), setDisableScroll(false)
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}
        className={`${styles.letsTalkItThroughPopup}`}>
        <div className={`${styles.transparentContainer}`} onClick={() => { setIsTalkItThrough(false), setDisableScroll(false) }} >
          <div className={`${styles.dialogBox}`}
            data-aos="zoom-in-up" onClick={(e) => { e.stopPropagation() }} >
            <div className={`${styles.contentSection}`}>
              <div className={`${styles.letsTalk}`}>
                Let&apos;s talk it through
              </div>
              <div className={`${styles.descriptionText1}`}>
                Submit your details, and we&apos;ll call you right back.
              </div>

              <div className="d-flex flex-column " style={{ position: 'relative' }} >
                <label htmlFor="fullName" className={`${styles.descriptionText2}`}>Full Name</label>
                <input
                  style={{ border: errors?.fullName ? '1px solid red' : '', }}

                  {...register('fullName')}
                  id="fullName"
                  type="text"
                  className=""
                  name="fullName"
                  placeholder="e.g John Smith"
                />
                {errors?.fullName && <span style={{ color: 'red', fontSize: "12px" }} >{`${errors?.fullName?.message}`}</span>}

              </div>

              <div className="d-flex flex-column">
                <label htmlFor="email" className={`${styles.descriptionText2}`}>Email Address</label>
                <input
                  style={{ border: errors?.email ? '1px solid red' : '' }}
                  {...register('email')}
                  id="email"
                  type="text"
                  className=""
                  name="email"
                  placeholder="e.g John.smith@example.co.uk"
                />
                {errors?.email && <span style={{ color: 'red', fontSize: "12px" }} >{`${errors?.email?.message}`}</span>}

              </div>

              <div className="d-flex flex-column">
                <label htmlFor="phone" className={`${styles.descriptionText2}`}>Contact Number</label>
                <input
                  style={{ border: errors?.phone ? '1px solid red' : '' }}

                  {...register('phone')}
                  id="phone"
                  type="text"
                  className=""
                  name="phone"
                  placeholder="e.g. 01234 567890"
                />
                {errors?.phone && <span style={{ color: 'red', fontSize: "12px" }} >{`${errors?.phone?.message}`}</span>}
              </div>

              <div />

              <div className={`${styles.buttonSection} text-center`}>
                <button type="submit" className={`${styles.buttonClass} ${styles.blueBG} `}
                  onClick={() => {
                    // setIsTalkItThrough(false),
                    setDisableScroll(false)
                  }}>
                  Submit
                </button>
                <div className={`${styles.buttonClass} ${styles.greyBG} `}
                  onClick={() => { setIsTalkItThrough(false), setDisableScroll(false) }}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default LetsTalkItThroughPopup;
