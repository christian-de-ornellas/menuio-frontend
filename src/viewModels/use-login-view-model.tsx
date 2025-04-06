import {z} from "zod";
import {useNavigate} from "react-router";
import useLoginService from "../services/login/use-login-service.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";

export const useLoginViewModel = () => {
    const loginSchema = z.object({
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const navigate = useNavigate();
    const {loginService} = useLoginService();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {

        loginService.mutate(data, {
            onSuccess: (response) => {
                const token = response?.token;
                const userId = response?.profile?._id;
                if (token) {
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("userId", userId);
                    navigate("/home");
                    toast("Seja bem vindo ao nosso sistema")
                }
            },
            onError: (error: any) => {
                console.error("Erro ao fazer login:", error);
                toast("Ops: aconteceu um error no nosso servidor.", {type: "error"})
            }
        });
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting
    };
}
