import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import { component$ } from "@builder.io/qwik";
import { CheckFillIcon } from "~/icons/icons";
import { Link } from "@builder.io/qwik-city";

/**
 * TCP sended
 */
export default component$(() => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px", "max-width": "500px" }}>
                <CardHeader style={{justifyContent: "center"}}>
                    <CheckFillIcon size="xl" styles={{color: "lightgreen"}}></CheckFillIcon>
                    Pin verificación enviado
                </CardHeader>
                <Divider></Divider>
                <CardContent>
                    <p style="text-align: center">
                        Verifica en la bandeja de entrada de tu correo electrónico para verifcar tu cuenta.
                    </p>
                    <Box mt={40} display="flex" justifyContent="center">
                        <Link href="/auth/signin">
                            <Button type="button" style={{"min-width": "250px"}}>Ir al inicio</Button>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
});