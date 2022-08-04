import { Role } from "@labeeb/core";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import LanguageToggle from "src/components/Buttons/LanguageToggle";
import { useStore } from "src/core/infrastructure/store";
import { useLogin } from "../application/login";
import styles from "./login.module.css";

const LoginPageContainer = styled("div")(
    ({ theme }) => `
    display: flex;
    width: 100%;
    height: 100%;
    `
);

const LeftContainer = styled("div")(
    ({ theme }) => `
    width: 50%;
    padding: 0 10%;
    background-image: linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%);

    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    `
);

const RightContainer = styled("div")(
    ({ theme }) => `
    width: 50%;
    padding: 0 10%;
    margin-bottom: ${theme.spacing(2)};

    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    `
);

const LanguageToggleContainer = styled("div")(
    ({ theme }) => `
    position: fixed;
    bottom: 3%;
    right: 3%;
    `
);

interface FormFields {
    email: string;
    password: string;
}

const Login = () => {
    const { t } = useTranslation();
    const { mutate, error, isLoading } = useLogin();
    const navigate = useNavigate();

    const user = useStore((state) => state.user);
    const setUserInfo = useStore((state) => state.setUserInfo);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        mutate(
            {
                ...data,
            },
            {
                onSuccess(userInfo) {
                    setUserInfo(userInfo);
                    if (userInfo.role === Role.ADMIN) navigate("/admin");
                    else navigate("/");
                },
            }
        );
    };

    // Redirect logged in users to /
    if (user) return <Navigate to="/" />;

    return (
        <LoginPageContainer>
            <LeftContainer>
                <Typography
                    variant="h1"
                    color="white"
                    borderBottom="0.5px solid silver"
                    fontSize="48px"
                    pb={4}
                    mb={8}
                >
                    {t("login.heading")} <br /> {t("login.with_labeeb")}
                </Typography>

                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.hoverDown}
                >
                    <path
                        d="M99.9186 47.1203C99.8496 45.9057 99.7363 44.6998 99.5801 43.5049C99.502 42.9072 99.4131 42.3127 99.3137 41.7207C99.2639 41.4248 99.2117 41.1297 99.1566 40.8354C99.1016 40.541 99.0439 40.2473 98.984 39.9545C98.9238 39.6617 98.8611 39.3697 98.7957 39.0783C98.5344 37.9133 98.2318 36.7615 97.8896 35.6248C97.7186 35.0564 97.5373 34.492 97.3465 33.9312C97.251 33.6508 97.1531 33.3717 97.0527 33.0934C92.7777 21.2363 84.0994 11.2533 72.6813 5.43145C71.2375 4.69531 69.751 4.02402 68.223 3.42578C68.2227 3.42559 68.2219 3.42539 68.2213 3.4252C62.5486 1.20273 56.5584 0.0511719 50.4348 0.00234375C50.432 0.00234375 50.4289 0.00234375 50.4258 0.00234375C50.423 0.00234375 50.4201 0.00214844 50.417 0.00214844C50.4111 0.00214844 50.4053 0.00214844 50.3996 0.00214844C50.3994 0.00214844 50.3992 0.00214844 50.3992 0.00214844C50.2668 0.000195313 50.1322 0 50 0C42.435 0 35.1643 1.64805 28.39 4.89863C25.3754 6.34492 22.4953 8.1041 19.8307 10.1258C18.0303 11.4896 16.3357 12.9604 14.7535 14.5277C14.3119 14.965 13.8797 15.4104 13.4559 15.8627C13.4277 15.8928 13.4002 15.9227 13.3721 15.9527C10.065 19.4992 7.30547 23.4953 5.16191 27.8395C4.09121 30.009 3.17285 32.2646 2.41855 34.5963C2.41836 34.5967 2.41836 34.5971 2.41816 34.5977C0.813477 39.5561 0 44.7383 0 50C0 51.3674 0.0560547 52.7311 0.166992 54.0879C0.211328 54.6307 0.264648 55.1723 0.326563 55.7125C0.425977 56.5793 0.549023 57.4426 0.693164 58.3014C1.07324 60.5654 1.6082 62.7988 2.29297 64.9844C2.38652 65.283 2.48262 65.5809 2.58164 65.8777C2.59688 65.9232 2.61113 65.9689 2.62656 66.0145C3.66504 69.0936 5.0043 72.0707 6.63105 74.8975C6.63145 74.898 6.63184 74.8988 6.63242 74.8994C12.6322 85.3297 22.1717 93.2533 33.4936 97.2107C38.7877 99.0617 44.341 100 50 100C50.1191 100 50.2365 99.9996 50.3555 99.9979C50.3557 99.9979 50.3561 99.9979 50.3563 99.9979C50.3615 99.9979 50.3672 99.9979 50.3723 99.9979C50.7762 99.9947 51.1793 99.9869 51.5818 99.9746C51.583 99.9746 51.584 99.9746 51.5854 99.9746C51.9828 99.9623 52.3795 99.9455 52.7756 99.924C52.799 99.9227 52.8223 99.9205 52.8457 99.9195C53.2191 99.8986 53.5922 99.8742 53.9643 99.8453C54.0225 99.8408 54.0803 99.8344 54.1387 99.8297C54.4758 99.8021 54.8125 99.7729 55.1484 99.7389C55.2391 99.7297 55.3295 99.7178 55.4201 99.708C55.7227 99.6754 56.0256 99.6426 56.3271 99.6045C56.4662 99.5869 56.6045 99.5658 56.7434 99.5471C56.9959 99.5129 57.249 99.4803 57.501 99.4426C57.7023 99.4123 57.9027 99.3775 58.1033 99.3447C58.2916 99.3141 58.4803 99.2857 58.6682 99.2529C58.9445 99.2047 59.2195 99.1514 59.4947 99.0984C59.6064 99.077 59.7189 99.0578 59.8305 99.0356C60.1869 98.9645 60.5426 98.8883 60.8975 98.8094C60.927 98.8029 60.9568 98.7971 60.9863 98.7904C63.6785 98.1865 66.318 97.3576 68.8908 96.3064C69.6594 95.9928 70.4213 95.6588 71.175 95.3059C73.4361 94.2467 75.6246 93.0141 77.7057 91.6264C89.5799 83.7096 97.5268 71.1029 99.5092 57.0373C99.8348 54.716 100 52.3486 100 50C100 49.0398 99.9727 48.0707 99.9186 47.1203ZM68.1582 8.10156C68.1617 8.10312 68.1652 8.1043 68.1686 8.10605C68.2133 8.12578 68.2586 8.14668 68.3045 8.1668C68.5025 8.25352 68.7002 8.34121 68.8965 8.43047C68.9857 8.47109 69.0746 8.51328 69.1637 8.5543C69.3156 8.6248 69.4674 8.69492 69.6184 8.76699C69.7188 8.81484 69.8186 8.86387 69.9188 8.91269C70.0572 8.98008 70.1959 9.04727 70.3338 9.11602C70.4383 9.16816 70.5422 9.22129 70.6465 9.27422C70.7781 9.34121 70.91 9.4082 71.0408 9.47637C71.1473 9.53184 71.2535 9.58809 71.3596 9.64434C71.4869 9.71191 71.6141 9.77969 71.7408 9.84844C71.8477 9.90645 71.9541 9.96504 72.0602 10.0236C72.1853 10.0928 72.3102 10.1625 72.4346 10.233C72.5404 10.2928 72.6459 10.3529 72.7514 10.4137C72.8746 10.4848 72.9973 10.5562 73.1195 10.6285C73.2248 10.6904 73.3297 10.7523 73.4344 10.815C73.5561 10.8881 73.6771 10.9619 73.7982 11.0361C73.9016 11.0994 74.0047 11.1625 74.1074 11.2264C74.2297 11.3027 74.3512 11.3799 74.4727 11.4572C74.5725 11.5207 74.6725 11.584 74.7715 11.648C74.8965 11.7291 75.0207 11.8113 75.1449 11.8936C75.2393 11.9559 75.3338 12.0176 75.4277 12.0807C75.5607 12.1703 75.6928 12.2613 75.825 12.3521C75.9084 12.4096 75.9924 12.466 76.0754 12.524C76.2662 12.6572 76.4559 12.792 76.6443 12.9279C76.7082 12.974 76.7719 13.0207 76.8355 13.067C77.0031 13.1893 77.1703 13.3117 77.3361 13.4361C77.4172 13.4971 77.4973 13.559 77.5779 13.6203C77.7051 13.717 77.8322 13.8133 77.9584 13.9113C78.0463 13.9793 78.133 14.0486 78.2201 14.1176C78.3375 14.21 78.4549 14.3025 78.5713 14.3961C78.6617 14.4688 78.751 14.5424 78.8408 14.6158C78.9525 14.707 79.0645 14.7986 79.1754 14.891C79.2658 14.9664 79.3557 15.0426 79.4455 15.1186C79.5547 15.2109 79.6635 15.3035 79.7719 15.3971C79.8611 15.474 79.9502 15.5516 80.0389 15.6295C80.1463 15.7236 80.2531 15.818 80.3598 15.9129C80.4475 15.9912 80.5346 16.0697 80.6217 16.1486C80.7281 16.2451 80.834 16.3424 80.9395 16.4396C81.0248 16.5186 81.11 16.5977 81.1947 16.677C81.3008 16.7766 81.4061 16.8768 81.5113 16.9771C81.5938 17.0561 81.6762 17.1348 81.7578 17.2141C81.8648 17.318 81.9709 17.4227 82.0768 17.5275C82.1551 17.6049 82.2336 17.6822 82.3113 17.7604C82.4221 17.8715 82.5312 17.9836 82.6406 18.0955C82.7119 18.1686 82.7834 18.241 82.8543 18.3145C82.9752 18.44 83.0947 18.567 83.2141 18.6939C83.2719 18.7555 83.3305 18.8164 83.3879 18.8781C83.5522 19.0547 83.7148 19.2324 83.8764 19.4115C83.8881 19.4246 83.9002 19.4373 83.9119 19.4504C84.0863 19.6443 84.2592 19.8396 84.4303 20.0365C84.4742 20.0869 84.517 20.1383 84.5607 20.1887C84.6861 20.3344 84.8111 20.4801 84.935 20.6271C84.9934 20.6967 85.0508 20.7672 85.1088 20.8369C85.2164 20.9664 85.3238 21.0963 85.4301 21.227C85.4928 21.3041 85.5545 21.382 85.6164 21.4594C85.7164 21.5842 85.8162 21.7092 85.9148 21.8352C85.9787 21.9166 86.0418 21.9986 86.1051 22.0807C86.2006 22.2041 86.2957 22.3279 86.3898 22.4521C86.4533 22.5361 86.5164 22.6205 86.5791 22.7047C86.6717 22.8289 86.7639 22.9533 86.8553 23.0783C86.9174 23.1633 86.9791 23.2488 87.041 23.3342C87.1316 23.4604 87.2217 23.5865 87.3109 23.7135C87.3711 23.7988 87.4313 23.8846 87.491 23.9705C87.5809 24.0998 87.6697 24.2299 87.7582 24.3602C87.8154 24.4443 87.8723 24.5279 87.9291 24.6125C88.0193 24.7473 88.1084 24.8826 88.1971 25.0182C88.2504 25.0994 88.3039 25.1805 88.3564 25.2623C88.449 25.4059 88.5404 25.5502 88.6314 25.6947C88.6781 25.7691 88.7256 25.843 88.7719 25.9176C88.8721 26.0787 88.9705 26.2408 89.0688 26.4029C89.1047 26.4621 89.1412 26.5209 89.1768 26.5805C89.3055 26.7955 89.4326 27.0115 89.5578 27.2287C89.5619 27.2357 89.566 27.2426 89.5699 27.2496C89.7027 27.4803 89.8334 27.7119 89.9623 27.9451C89.9723 27.9631 89.9816 27.9812 89.9916 27.999C90.1068 28.2082 90.2205 28.418 90.3326 28.6287C90.3652 28.6902 90.3969 28.7521 90.4293 28.8139C90.5176 28.9818 90.6055 29.1502 90.6916 29.3195C90.7307 29.3963 90.7687 29.4734 90.8074 29.5504C90.8855 29.7057 90.9631 29.8611 91.0393 30.017C91.0803 30.1014 91.1207 30.1859 91.1615 30.2707C91.2338 30.4207 91.3053 30.5709 91.3758 30.7219C91.4174 30.8107 91.4582 30.9002 91.4992 30.9893C91.567 31.1367 91.6342 31.2844 91.7004 31.433C91.7412 31.5246 91.7816 31.6162 91.8221 31.7082C91.8869 31.8561 91.951 32.0041 92.0143 32.1525C92.0535 32.2447 92.0928 32.3373 92.1314 32.4297C92.1941 32.5793 92.2559 32.7295 92.3166 32.8799C92.3539 32.9719 92.3912 33.0639 92.4279 33.1561C92.4891 33.3096 92.549 33.4635 92.6084 33.6176C92.643 33.7068 92.6775 33.7963 92.7117 33.8859C92.7727 34.0467 92.8316 34.2076 92.8908 34.3691C92.9217 34.4533 92.9527 34.5371 92.9832 34.6215C93.0459 34.7957 93.1064 34.9703 93.167 35.1457C93.1918 35.2176 93.2174 35.2893 93.2418 35.3611C93.3131 35.5711 93.3824 35.7822 93.451 35.9934C93.4631 36.0311 93.476 36.0684 93.4879 36.1061C93.5693 36.36 93.6486 36.6146 93.7258 36.8707C93.7275 36.8762 93.7291 36.8816 93.7305 36.8873C93.8041 37.1318 93.8754 37.3773 93.9451 37.6234C93.9654 37.6953 93.9844 37.7676 94.0045 37.8395C94.0545 38.0197 94.1041 38.1998 94.152 38.3811C94.1758 38.4719 94.1986 38.5633 94.2221 38.6545C94.2641 38.8174 94.3055 38.9799 94.3457 39.1434C94.3703 39.2436 94.394 39.3441 94.418 39.4447C94.4549 39.5994 94.4914 39.7543 94.5268 39.9096C94.551 40.016 94.5744 40.1229 94.5977 40.2295C94.6307 40.3795 94.6631 40.5299 94.6945 40.6807C94.7174 40.7904 94.7398 40.9006 94.7619 41.0109C94.7918 41.1592 94.8209 41.3078 94.8492 41.4566C94.8707 41.5691 94.8916 41.6814 94.9123 41.7939C94.9393 41.9416 94.9654 42.0893 94.9908 42.2371C95.0104 42.3508 95.0299 42.4646 95.0488 42.5789C95.0732 42.7264 95.0963 42.8738 95.1189 43.0217C95.1367 43.1367 95.1547 43.2518 95.1715 43.3666C95.1932 43.5146 95.2135 43.6629 95.2336 43.8111C95.2494 43.9264 95.2656 44.0414 95.2803 44.1568C95.2998 44.3082 95.3176 44.4602 95.3355 44.6119C95.3488 44.7242 95.3629 44.8367 95.3754 44.9492C95.3775 44.9684 95.3793 44.9875 95.3812 45.0066C92.2932 44.5742 89.4639 42.7482 87.3346 39.7895C84.8877 36.3893 83.665 31.9406 83.8908 27.2604L83.8953 27.1867C84.1396 22.4889 81.4188 18.135 77.1242 16.3525C69.227 13.0783 67.584 10.6004 67.6178 9.92148C67.6486 9.30195 67.8293 8.69297 68.1582 8.10156ZM7.06816 34.4406C7.21992 34.0211 7.37793 33.6047 7.54141 33.1908C7.57148 33.1146 7.60176 33.0387 7.63223 32.9627C7.79883 32.5475 7.97051 32.135 8.14883 31.7258C8.17383 31.6684 8.19961 31.6115 8.225 31.5541C8.41094 31.1318 8.60195 30.7123 8.80019 30.2969C8.8043 30.2883 8.8082 30.2793 8.8123 30.2705C9.0123 29.8521 9.22012 29.4383 9.43262 29.027C9.46387 28.9666 9.49453 28.9059 9.52578 28.8457C9.73066 28.4535 9.9416 28.0648 10.1574 27.6791C10.1975 27.6076 10.2377 27.5363 10.2781 27.4652C10.4961 27.0809 10.7189 26.6996 10.948 26.3219C10.983 26.2641 11.0189 26.207 11.0541 26.1494C11.2957 25.7551 11.5418 25.3633 11.7951 24.9766C11.7977 24.9725 11.8006 24.9686 11.8033 24.9645C12.0555 24.5799 12.315 24.2006 12.5789 23.8238C12.617 23.7695 12.6543 23.7148 12.6926 23.6607C12.9469 23.3012 13.2074 22.9455 13.4721 22.5934C13.5227 22.526 13.5734 22.4588 13.6244 22.3918C13.8896 22.0432 14.1596 21.6977 14.4354 21.3566C14.482 21.2988 14.5295 21.2416 14.5764 21.184C14.8645 20.8307 15.1566 20.4807 15.4555 20.1359C15.4705 20.1186 15.4861 20.1016 15.5012 20.0842C15.7945 19.7471 16.0939 19.4145 16.3975 19.0855C16.442 19.0373 16.4857 18.9887 16.5305 18.9406C16.8309 18.618 17.1369 18.3002 17.4473 17.9855C17.5092 17.9227 17.5709 17.8602 17.6332 17.7979C17.9422 17.4883 18.2557 17.1824 18.574 16.8809C18.6326 16.8252 18.6922 16.7705 18.7514 16.715C19.0822 16.4051 19.417 16.0984 19.7578 15.7975C19.7854 15.7732 19.8137 15.7494 19.8412 15.7252C20.1746 15.4324 20.5131 15.1443 20.8561 14.8602C20.8887 14.833 20.9211 14.8057 20.9539 14.7787C21.1195 14.9707 21.2814 15.1678 21.4391 15.3691C24.5213 19.308 25.4328 25.0172 24.5197 26.7967C24.3836 27.0619 24.3301 27.0686 24.0971 27.0596C24.0967 27.0596 24.0963 27.0596 24.0957 27.0594C19.852 26.892 16.0457 29.4385 12.6922 31.6902C10.941 32.8658 9.2875 33.9764 7.99961 34.3793C7.58613 34.5086 7.28398 34.5516 7.03945 34.5174C7.05 34.4926 7.05898 34.4666 7.06816 34.4406ZM66.3904 90.5561C66.3904 90.5566 66.3902 90.5574 66.3902 90.558C66.3285 91.2803 66.2428 92.0027 66.134 92.7176C65.8418 92.8279 65.549 92.9361 65.2551 93.0404C65.1822 93.0664 65.109 93.0908 65.0359 93.1162C64.7947 93.2004 64.5529 93.2832 64.3105 93.3631C64.1973 93.4004 64.0838 93.4365 63.9703 93.473C63.7641 93.5393 63.5572 93.6045 63.35 93.6678C63.2299 93.7045 63.1094 93.7408 62.9889 93.7766C62.7797 93.8385 62.5701 93.8988 62.3604 93.9576C62.2475 93.9894 62.1348 94.0217 62.0217 94.0525C61.7635 94.123 61.5045 94.1906 61.2451 94.2562C61.1824 94.2721 61.1201 94.2893 61.0574 94.3049C60.7389 94.3842 60.4193 94.4594 60.0992 94.5318C59.9979 94.5547 59.8963 94.5758 59.7949 94.5979C59.5711 94.6467 59.3469 94.6945 59.1223 94.7402C58.9994 94.765 58.8766 94.7889 58.7535 94.8127C58.5453 94.8531 58.3367 94.892 58.1281 94.9297C58.0037 94.9521 57.8795 94.9742 57.7551 94.9955C57.5336 95.0334 57.3115 95.0689 57.0896 95.1035C56.9818 95.1203 56.8742 95.1381 56.7662 95.1539C56.4404 95.2021 56.1139 95.2479 55.7867 95.2891C55.7465 95.2941 55.7063 95.2982 55.666 95.3029C55.3756 95.3389 55.0846 95.3719 54.793 95.4023C54.6789 95.4143 54.5645 95.4246 54.4502 95.4353C54.2295 95.4566 54.0086 95.477 53.7873 95.4949C53.6611 95.5051 53.5352 95.5146 53.4088 95.524C53.1926 95.5398 52.976 95.5541 52.759 95.567C52.6373 95.5742 52.5154 95.5816 52.3936 95.5879C52.3377 95.5906 52.2816 95.5924 52.2258 95.5951C52.0033 93.6002 51.9816 91.4666 52.1658 89.3277C52.5564 84.8049 53.8016 80.6635 55.6721 77.6656C57.1705 75.2645 58.8932 73.9121 60.4377 73.9121C60.5127 73.9121 60.5873 73.9154 60.6613 73.9217C62.2602 74.0596 63.8178 75.7158 64.9344 78.466C66.2639 81.741 66.7811 86.0346 66.3904 90.5561ZM74.4154 88.5789C74.4025 88.5869 74.3902 88.5955 74.3773 88.6037C74.2785 88.6664 74.1779 88.7266 74.0787 88.7885C73.8715 88.9172 73.6645 89.0457 73.4553 89.1713C73.3334 89.2443 73.2104 89.3156 73.0875 89.3875C72.8984 89.4986 72.7092 89.6092 72.5186 89.7176C72.3881 89.7918 72.2568 89.8643 72.1258 89.9371C71.9398 90.0404 71.7535 90.1426 71.5662 90.2432C71.433 90.3147 71.2992 90.3856 71.165 90.4561C71.0242 90.5299 70.8826 90.602 70.7412 90.6742C71.1475 85.5729 70.5199 80.6658 68.9631 76.8313C67.1838 72.449 64.3682 69.8777 61.0354 69.5906C57.7031 69.3021 54.4871 71.3525 51.9834 75.3648C49.7562 78.934 48.2828 83.7602 47.834 88.9551C47.64 91.2068 47.6533 93.4613 47.8602 95.6016C47.6734 95.5928 47.4869 95.5832 47.3006 95.5725C47.1979 95.5666 47.0949 95.5607 46.9924 95.5541C46.7674 95.5395 46.5426 95.5229 46.318 95.5047C46.2473 95.4992 46.1768 95.4945 46.1061 95.4885C45.8131 95.4639 45.5203 95.4363 45.2281 95.4061C45.1549 95.3984 45.0818 95.3895 45.0086 95.3816C44.7881 95.3578 44.568 95.3324 44.3479 95.3053C44.2447 95.2924 44.1418 95.2789 44.0389 95.2654C43.8459 95.2402 43.6529 95.2139 43.4602 95.1863C43.3537 95.1711 43.2473 95.1557 43.1408 95.1398C42.9406 95.1096 42.7406 95.0777 42.5408 95.0449C42.4486 95.0299 42.3564 95.0154 42.2645 94.9996C41.976 94.9502 41.6877 94.899 41.4004 94.8441C41.3828 94.8408 41.3656 94.8371 41.348 94.8338C41.0773 94.782 40.8074 94.7273 40.5379 94.6705C40.4432 94.6506 40.3486 94.6295 40.2539 94.6088C40.0594 94.5666 39.865 94.5234 39.6711 94.4783C39.5656 94.4539 39.4602 94.4289 39.3547 94.4037C39.1662 94.3588 38.9779 94.3123 38.7898 94.2648C38.6895 94.2394 38.5891 94.2144 38.4887 94.1883C38.2705 94.1316 38.0525 94.0729 37.835 94.0129C37.7689 93.9945 37.7025 93.9773 37.6365 93.9588C37.6242 93.9553 37.6117 93.9514 37.5994 93.9479C45.3418 81.8879 48.7068 73.2596 50.9812 67.4285C53.8023 60.1957 54.5006 59.0346 57.8734 59.0346C62.1354 59.0346 66.2104 61.6961 69.3471 66.5287C72.6725 71.6516 74.5039 78.5057 74.5039 85.8281C74.5043 86.7445 74.4744 87.6658 74.4154 88.5789ZM78.8449 85.3811C78.7701 77.3947 76.7025 69.8738 72.9945 64.1617C69.0285 58.052 63.6586 54.6869 57.8736 54.6869C51.284 54.6869 49.6453 58.8883 46.9309 65.8488C44.6639 71.6615 41.2789 80.3359 33.3459 92.5176C26.0809 89.6711 19.6898 85.0098 14.7563 79.0191C15.0832 79.1436 15.4115 79.2666 15.7424 79.3865C18.7615 80.4832 21.2926 81.0297 23.4293 81.0297C25.2221 81.0297 26.7375 80.6447 28.0287 79.8772C32.1727 77.4139 33.0408 71.6576 34.1398 64.3699C35.1637 57.5812 36.4379 49.1322 40.592 40.2703C41.7117 37.8813 42.5066 35.4188 42.9535 32.9516C43.1674 31.7701 42.3836 30.6389 41.202 30.4248C40.0211 30.2109 38.8896 30.9951 38.6752 32.1764C38.2951 34.2734 37.6154 36.376 36.6549 38.425C32.2326 47.8592 30.9062 56.6543 29.8402 63.7215C28.9127 69.8713 28.1801 74.7289 25.8064 76.1396C24.2068 77.0908 21.3996 76.8158 17.2258 75.2996C14.7107 74.3863 12.317 73.342 10.1012 72.1916C10.0264 72.0576 9.95156 71.9238 9.87832 71.7891C9.76738 71.5854 9.65723 71.3814 9.5498 71.1764C9.42988 70.9473 9.31289 70.7166 9.19668 70.4857C9.09336 70.2803 8.99043 70.0746 8.89043 69.8678C8.77734 69.6338 8.66777 69.3986 8.55898 69.1629C8.46289 68.9551 8.3668 68.7475 8.27402 68.5385C8.16816 68.2998 8.06602 68.0598 7.96426 67.8193C7.87578 67.6104 7.78691 67.4018 7.70156 67.1912C7.60293 66.9482 7.5084 66.7033 7.41387 66.4586C7.33262 66.2477 7.25039 66.0373 7.17227 65.8252C7.08125 65.5779 6.99453 65.3293 6.90742 65.0807C6.83359 64.8689 6.75859 64.6574 6.6877 64.4443C6.60371 64.1926 6.5248 63.9391 6.44551 63.6857C6.37891 63.473 6.31094 63.2611 6.24746 63.0477C6.17129 62.792 6.10059 62.5346 6.02891 62.2777C5.96953 62.0643 5.9084 61.8514 5.85215 61.6371C5.78398 61.3773 5.72109 61.116 5.65742 60.8549C5.60527 60.6414 5.55117 60.4281 5.50215 60.2139C5.4418 59.9502 5.3873 59.685 5.33164 59.4201C5.28672 59.2064 5.23945 58.9932 5.19766 58.7785C5.14531 58.5102 5.09922 58.2406 5.05156 57.9715C5.01387 57.7588 4.97383 57.5469 4.93926 57.3338C4.89473 57.059 4.85684 56.783 4.81738 56.5072C4.7873 56.298 4.7543 56.0896 4.72715 55.8799C4.69062 55.5975 4.66113 55.3141 4.62969 55.0311C4.60703 54.8268 4.58125 54.6227 4.56113 54.4178C4.53242 54.1228 4.51152 53.8268 4.48848 53.5309C4.47344 53.3369 4.45488 53.1437 4.44219 52.9496C4.42109 52.6225 4.40801 52.2941 4.39395 51.9664C4.38691 51.8031 4.37598 51.64 4.37051 51.4766C4.35527 50.985 4.34707 50.4926 4.34707 49.9996C4.34707 46.1584 4.82266 42.3648 5.76074 38.6861C6.19609 38.8057 6.67031 38.875 7.18711 38.875C7.82578 38.875 8.52812 38.7707 9.29902 38.5293C11.1881 37.9377 13.0963 36.6566 15.1162 35.3004C17.9164 33.4205 21.0926 31.2893 23.9182 31.4041C25.8639 31.484 27.492 30.5287 28.3885 28.7818C30.5041 24.6572 28.2289 16.9912 24.8635 12.6902C24.7254 12.5137 24.5828 12.342 24.4398 12.1709C24.4744 12.1475 24.5092 12.124 24.5438 12.1006C24.7297 11.9754 24.9162 11.8512 25.1037 11.7289C25.2232 11.6508 25.3436 11.5734 25.4637 11.4967C25.6502 11.3775 25.8381 11.2598 26.0264 11.1434C26.1461 11.0691 26.2656 10.9951 26.3861 10.9223C26.5846 10.802 26.7844 10.6842 26.9846 10.567C27.0949 10.5023 27.2051 10.4367 27.3158 10.373C27.559 10.2334 27.8039 10.0969 28.0496 9.96191C28.1186 9.92402 28.1867 9.88477 28.2557 9.84727C28.5559 9.68418 28.858 9.52559 29.1615 9.36953C33.0174 12.1285 36.0035 15.9908 37.6346 20.3594C38.0545 21.4842 39.3074 22.0555 40.4314 21.6355C41.5563 21.2156 42.1275 19.9633 41.7076 18.8387C40.0609 14.4285 37.2498 10.4613 33.6369 7.36602C37.3643 5.93086 41.2377 5.00508 45.2197 4.59473C44.0811 6.4209 43.4775 8.39023 43.4775 10.3971C43.4775 15.0217 48.8992 19.2131 60.052 23.2104C63.9119 24.5955 66.4967 28.3328 66.4842 32.5166V32.6078C66.4842 40.0656 68.8141 47.0975 73.0443 52.4082C77.3904 57.8641 83.2123 60.8686 89.4385 60.8686C91.1627 60.8686 92.8578 60.6375 94.5102 60.1799C92.2543 70.068 86.7285 78.9482 78.8449 85.3811ZM95.635 51.1859C95.633 51.2637 95.6312 51.3418 95.6289 51.4197C95.6172 51.8027 95.6008 52.1855 95.5795 52.5686C95.5756 52.6387 95.5707 52.709 95.5666 52.7793C95.5439 53.1531 95.518 53.527 95.4863 53.9002C95.484 53.9295 95.482 53.9592 95.4793 53.9887C95.4457 54.3795 95.4057 54.7695 95.3621 55.159C95.3574 55.2008 95.3525 55.2428 95.3479 55.2844C93.4492 56.1066 91.4664 56.5227 89.4387 56.5227C79.1791 56.5227 70.8322 45.7953 70.8322 32.6096V32.5248C70.8504 26.5113 67.1086 21.1244 61.5203 19.1187C51.4125 15.4959 47.826 12.1568 47.826 10.398C47.826 7.79863 49.518 5.7418 51.1459 4.36484C51.1973 4.36621 51.2486 4.36641 51.2998 4.36797C51.4504 4.37227 51.601 4.37812 51.7516 4.38379C51.9424 4.39102 52.1332 4.39805 52.3238 4.40762C52.4766 4.41523 52.6293 4.42461 52.7816 4.43379C52.9689 4.44492 53.1564 4.45645 53.3434 4.47012C53.4982 4.48125 53.6525 4.49375 53.807 4.50645C53.9914 4.52168 54.1758 4.5373 54.3598 4.55469C54.5152 4.56934 54.6705 4.58516 54.8256 4.60137C55.0082 4.62051 55.1904 4.64043 55.3725 4.66172C55.5283 4.67969 55.6842 4.69902 55.8398 4.71895C56.0205 4.74199 56.201 4.76621 56.3811 4.79141C56.5371 4.81309 56.6932 4.83574 56.8488 4.85898C57.0281 4.88594 57.207 4.91426 57.3859 4.94336C57.5414 4.96855 57.6969 4.99414 57.852 5.02109C58.0305 5.05195 58.2088 5.08457 58.3867 5.11758C58.5414 5.14629 58.6965 5.1752 58.8508 5.20547C59.0283 5.24043 59.2055 5.27695 59.3826 5.31426C59.5367 5.34648 59.6908 5.37852 59.8445 5.4123C60.0221 5.45137 60.199 5.49258 60.376 5.53359C60.5279 5.56875 60.6801 5.60371 60.8316 5.64082C61.0104 5.68438 61.1883 5.73008 61.3666 5.77578C61.516 5.81406 61.6652 5.85156 61.8143 5.89141C61.9943 5.93965 62.1736 5.99023 62.3529 6.04082C62.499 6.08164 62.6455 6.12188 62.7912 6.16445C62.975 6.21816 63.158 6.27441 63.341 6.33047C63.4813 6.37324 63.6217 6.41484 63.7615 6.45918C63.8647 6.4918 63.967 6.52676 64.0697 6.55996C63.598 7.56836 63.3266 8.62813 63.2734 9.70938C63.0914 13.4086 67.0771 16.8957 75.4572 20.3695C78.0553 21.448 79.701 24.0971 79.5533 26.942L79.549 27.0113C79.5486 27.0203 79.5479 27.0291 79.5475 27.0381C79.2711 32.701 80.7832 38.1316 83.8041 42.3301C86.8361 46.5434 91.0272 49.0436 95.6428 49.4086C95.6451 49.6063 95.6512 49.8037 95.6512 50.001C95.652 50.3953 95.6453 50.7904 95.635 51.1859Z"
                        fill="#F6F8FB"
                        fillOpacity="0.5"
                    />
                    <path
                        d="M43.1584 25.3897C42.7785 24.2508 41.548 23.6348 40.4086 24.0147C39.4363 24.3389 38.8457 25.2832 38.9293 26.261C39.0061 27.2244 39.723 28.052 40.7189 28.228C40.8467 28.2506 40.974 28.2614 41.0994 28.2614C42.1344 28.2614 43.0516 27.5194 43.2377 26.4649C43.3004 26.1084 43.2727 25.7326 43.1584 25.3897Z"
                        fill="#F6F8FB"
                        fillOpacity="0.5"
                    />
                    <path
                        d="M23.8641 46.9176C22.2096 43.9854 19.8721 42.3707 17.2826 42.3707C14.693 42.3707 12.3557 43.9856 10.7012 46.9176C9.26779 49.4574 8.47833 52.7873 8.47833 56.294C8.47833 59.8006 9.26779 63.1305 10.7012 65.6705C12.3557 68.6028 14.6932 70.2174 17.2826 70.2174C19.8723 70.2174 22.2096 68.6026 23.8641 65.6705C25.2975 63.1305 26.0869 59.8008 26.0869 56.294C26.0869 52.7873 25.2977 49.4574 23.8641 46.9176ZM17.2826 65.8696C15.1789 65.8696 12.8262 61.7742 12.8262 56.294C12.8262 50.8137 15.1791 46.7186 17.2826 46.7186C19.3863 46.7186 21.7391 50.8135 21.7391 56.294C21.7391 61.7744 19.3863 65.8696 17.2826 65.8696Z"
                        fill="#F6F8FB"
                        fillOpacity="0.5"
                    />
                </svg>

                <svg
                    width="512"
                    height="346"
                    viewBox="0 0 512 346"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ alignSelf: "flex-end" }}
                    className={styles.hoverUp}
                >
                    <path
                        d="M505.38 25.748C495.3 8.663 476.642 0 449.928 0C421.492 0 381.608 10.006 334.424 28.953C310.855 16.099 284.015 8.927 256 8.927C165.868 8.927 92.498 82.03 92.047 172.057C77.895 183.611 65.052 195.01 53.87 205.972C47.744 211.98 42.054 217.918 36.959 223.619C34.052 226.872 34.333 231.865 37.587 234.772C40.84 237.68 45.834 237.397 48.74 234.144C53.603 228.7 59.05 223.018 64.929 217.252C73.386 208.963 82.83 200.401 93.115 191.696C93.197 192.418 93.296 193.138 93.389 193.858C93.451 194.34 93.506 194.824 93.572 195.305C93.733 196.482 93.91 197.657 94.096 198.83C94.102 198.87 94.108 198.91 94.114 198.95C95.397 206.981 97.27 214.899 99.738 222.651C97.143 224.967 94.645 227.243 92.276 229.448C82.183 238.845 48.876 271.093 44.089 291.519C43.117 295.663 45.603 299.831 49.71 300.945C52.964 301.829 57.123 302.276 62.072 302.276C80.588 302.276 108.938 295.726 141.918 283.827C141.948 283.816 141.976 283.806 142.005 283.795C184.514 268.45 232.787 245.115 281.617 216.303C303.481 203.403 324.668 189.829 344.591 175.957C348.171 173.464 349.052 168.542 346.56 164.962C344.066 161.383 339.146 160.498 335.565 162.993C315.966 176.639 295.113 189.998 273.589 202.697C227.5 229.892 182.018 252.071 141.642 267.089C124.127 245.845 112.955 220.256 109.224 193.165C109.205 193.028 109.189 192.891 109.171 192.753C108.417 187.079 107.975 181.362 107.87 175.638C107.87 175.618 107.865 175.598 107.865 175.578C107.849 174.682 107.834 173.786 107.834 172.887C107.834 91.188 174.301 24.72 256.001 24.72C297.522 24.72 336.179 42.157 363.624 71.094C376.566 84.739 386.853 100.814 393.782 118.301C383.306 127.289 371.777 136.507 359.435 145.757C355.945 148.373 355.236 153.324 357.852 156.814C360.467 160.305 365.42 161.016 368.909 158.397C383.209 147.679 396.465 136.987 408.31 126.617C408.376 126.559 408.443 126.503 408.507 126.443C412.469 122.971 416.244 119.567 419.725 116.324C446.666 91.244 464.68 68.04 467.913 54.255C468.885 50.111 466.399 45.941 462.291 44.828C459.036 43.944 454.877 43.497 449.928 43.497C432.351 43.497 405.907 49.4 375.068 60.175C374.83 59.923 374.586 59.68 374.346 59.429C374.173 59.25 374 59.071 373.826 58.893C366.858 51.687 359.287 45.148 351.166 39.352C391.683 23.906 425.62 15.79 449.927 15.79C470.655 15.79 484.736 21.838 491.774 33.77C506.04 57.954 483.208 88.537 468.309 106.579C450.458 128.195 428.802 146.298 407.067 163.845C375.143 189.619 336.631 216.009 295.696 240.163C254.593 264.416 212.88 285.384 175.067 300.8C128.248 319.89 89.173 329.98 62.071 329.98C41.343 329.98 27.264 323.932 20.226 312.004C13.138 299.988 14.722 284.608 24.937 266.292C26.642 263.235 28.677 259.962 30.983 256.567C33.434 252.959 32.496 248.046 28.887 245.595C25.281 243.144 20.368 244.082 17.915 247.691C15.35 251.468 13.069 255.137 11.139 258.597C-2.00297 282.167 -3.52497 302.836 6.62003 320.031C16.701 337.115 35.358 345.778 62.071 345.778C90.493 345.778 130.348 335.782 177.502 316.855C182.266 319.457 187.177 321.846 192.159 323.954C212.174 332.425 234.182 336.848 256.142 336.848C257.962 336.848 259.783 336.817 261.602 336.756C265.962 336.609 269.378 332.957 269.231 328.596C269.084 324.237 265.432 320.818 261.071 320.967C239.595 321.695 217.892 317.69 198.316 309.404C197.824 309.195 197.338 308.969 196.847 308.755C230.999 293.898 267.611 275.077 303.725 253.767C339.719 232.529 373.891 209.565 403.513 186.752C401.592 207.218 395.444 227.138 385.442 245.039C373.6 266.237 356.537 284.397 336.097 297.557C324.437 305.064 311.809 310.882 298.566 314.848C294.387 316.099 292.013 320.501 293.265 324.68C294.291 328.104 297.429 330.315 300.829 330.315C301.579 330.315 302.343 330.207 303.098 329.981C317.762 325.59 331.743 319.15 344.65 310.839C367.257 296.283 386.132 276.194 399.233 252.745C412.661 228.712 419.81 201.403 419.951 173.72C434.099 162.17 446.941 150.77 458.131 139.803C477.718 120.601 492.093 102.893 500.861 87.172C514.004 63.61 515.525 42.942 505.38 25.748ZM125.897 272.682C100.072 281.347 78.22 286.188 63.426 286.469C69.013 276.979 80.916 261.61 103.041 241.014C103.92 240.196 104.82 239.366 105.736 238.527C111.019 250.624 117.772 262.098 125.897 272.682ZM448.575 59.315C442.986 68.806 431.084 84.174 408.959 104.769C408.086 105.582 407.193 106.406 406.283 107.239C400.903 94.933 394.101 83.497 386.104 73.102C411.93 64.438 433.781 59.598 448.575 59.315Z"
                        fill="#F6F8FB"
                        fillOpacity="0.5"
                    />
                </svg>
            </LeftContainer>
            <RightContainer>
                <Typography variant="h1">{t("login.title")}</Typography>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="normal"
                        label={t("login.email")}
                        variant="standard"
                        placeholder="ahmad@gmail.com"
                        error={!!errors.email}
                        helperText={errors.email?.message ?? ""}
                        {...register("email", { required: "Please enter your email" })}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label={t("login.password")}
                        type="password"
                        variant="standard"
                        {...register("password", {
                            required: "Please enter your password",
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message ?? ""}
                    />

                    <p>{error && error.message}</p>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: "100%",
                            py: 2,
                            background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
                        }}
                    >
                        {t("login.start")}
                        {isLoading && <CircularProgress size={32} sx={{ color: "white", ml: 3 }} />}
                    </Button>
                </form>

                <LanguageToggleContainer>
                    <LanguageToggle />
                </LanguageToggleContainer>
            </RightContainer>
        </LoginPageContainer>
    );
};

export default Login;
