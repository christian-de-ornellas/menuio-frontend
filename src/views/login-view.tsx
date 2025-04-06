import {Button} from "../components/ui/button";
import {Card, CardContent, CardHeader} from "../components/ui/card";
import {Input} from "../components/ui/input";
import {Label} from "../components/ui/label";
import {useLoginViewModel} from "../viewModels/use-login-view-model";

const LoginView = () => {
    const {handleSubmit, register, onSubmit, errors, isSubmitting} = useLoginViewModel();

    return (
        <article className="flex flex-col justify-center items-center h-screen">
            <div className="w-96">
                <Card>
                    <CardHeader>
                        Cardápio Digital
                        <small className="text-gray-500">
                            <b>email</b>: demo@menuio.com <br/>
                            <b>senha</b>: rootroot
                        </small>
                    </CardHeader>
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
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </article>
    );
}
export default LoginView;