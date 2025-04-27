import { component$, CSSProperties, IntrinsicElements, Slot } from "@builder.io/qwik";
import styleUtil from "~/utils/style.util";

type IBoxProps = IntrinsicElements["div"] & {
    flexDirection?: CSSProperties["flex-direction"],
    justifyContent?: CSSProperties["justifyContent"],
    alignItems?: CSSProperties["alignItems"],
    display?: CSSProperties["display"],
    width?: CSSProperties["width"],
    height?: CSSProperties["height"],
    style?: CSSProperties, // Nota: Ahora es opcional para mayor flexibilidad
    p?: number,
    m?: number,
    px?: number,
    py?: number,
    pt?: number,
    pl?: number,
    pr?: number,
    pb?: number,
    mx?: number,
    my?: number,
    mt?: number,
    mb?: number,
    ml?: number,
    mr?: number,
    gap?: number
}

export default component$<IBoxProps>((props) => {
    // Extract styles
    const styles = styleUtil.parse(props.style)
    
    // Margin
    const ml = props.ml ?? props.mx ?? props.m ?? styles?.marginLeft ?? styles?.margin;
    const mr = props.mr ?? props.mx ?? props.m ?? styles?.marginRight ?? styles?.margin;
    const mt = props.mt ?? props.my ?? props.m ?? styles?.marginTop ?? styles?.margin;
    const mb = props.mb ?? props.my ?? props.m ?? styles?.marginBottom ?? styles?.margin;

    // Padding
    const pl = props.pl ?? props.px ?? props.p ?? styles?.paddingLeft ?? styles?.padding;
    const pr = props.pr ?? props.px ?? props.p ?? styles?.paddingRight ?? styles?.padding;
    const pt = props.pt ?? props.py ?? props.p ?? styles?.paddingTop ?? styles?.padding;
    const pb = props.pb ?? props.py ?? props.p ?? styles?.paddingBottom ?? styles?.padding;
    const gap = props.gap ?? props.gap;

    const flexDirection = props.flexDirection ?? styles?.flexDirection;
    const justifyContent = props.justifyContent ?? styles?.justifyContent;
    const alignItems = props.alignItems ?? styles?.alignItems;
    const display = props.display ?? styles?.display;
    const width = props.width ?? styles?.width;
    const height = props.height ?? styles?.height;
    
    return (
        <div
            {...props}
            style={{
                ...styles, // Mantén el estilo original pasado como propiedad
                paddingTop: pt,
                paddingBottom: pb,
                paddingLeft: pl,
                paddingRight: pr,
                marginTop: mt,
                marginBottom: mb,
                marginLeft: ml,
                marginRight: mr,
                gap: gap,
                flexDirection: flexDirection,
                justifyContent: justifyContent,
                alignItems: alignItems,
                display: display,
                width: width,
                height: height,

            }}
        >
            <Slot></Slot>
        </div>
    );
});
