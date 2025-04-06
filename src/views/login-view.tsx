import {cn} from "../lib/utils";
import {Button} from "../components/ui/button";
import {Card, CardContent} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Label} from "../components/ui/label";
import {useLoginViewModel} from "../viewModels/use-login-view-model";

const LoginView = ({className, ...props}: any) => {
    const {handleSubmit, register, onSubmit, errors, isSubmitting} = useLoginViewModel();

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Senha</Label>
                                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                            Esqueci minha senha?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" {...register("password")} />
                                    {errors.password &&
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Aguarde..." : "Entrar"}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Não tem uma conta?{" "}
                                <a href="#" className="underline underline-offset-4">Crie uma conta grátis</a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
export default LoginView;