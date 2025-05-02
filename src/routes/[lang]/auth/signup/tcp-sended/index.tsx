import Box from "~/components/box/box";
import Divider from "~/components/divider/divider";
import Button from "~/components/button/button";
import Card, { CardContent, CardHeader } from "~/components/card/card";
import { component$ } from "@builder.io/qwik";
import { CheckFillIcon } from "~/icons/icons";
import { Link } from "@builder.io/qwik-city";
import useLang from "~/hooks/useLang";

/**
 * TCP sended
 */
export default component$(() => {
    const lang = useLang(["@route-signup-tcp-sended"]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" class="signin">
            <Card style={{ "min-width": "350px", "max-width": "500px" }}>
                <CardHeader style={{justifyContent: "center"}}>
                    <CheckFillIcon size="xl" styles={{color: "lightgreen"}}></CheckFillIcon>
                    {lang["@route-signup-tcp-sended"]?.header}
                </CardHeader>
                <Divider></Divider>
                <CardContent>
                    <p style="text-align: center">
                        {lang["@route-signup-tcp-sended"]?.text}
                    </p>
                    <Box mt={40} display="flex" justifyContent="center">
                        <Link href={`/${lang.langType}/auth/signin`}>
                            <Button type="button" style={{"min-width": "250px"}}>
                                {lang["@route-signup-tcp-sended"]?.button}
                            </Button>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
});