import { component$, type CSSProperties, type IntrinsicElements, Slot } from "@builder.io/qwik";
import styleUtil from "~/utils/style.util";

/**
 * Box Props
 */
type IBoxProps = IntrinsicElements["div"] & {
    /**
     * Flex direction CSS
     */
    flexDirection?: CSSProperties["flex-direction"],
    /**
     * Justify content CSS
     */
    justifyContent?: CSSProperties["justifyContent"],
    /**
     * Align items CSS
     */
    alignItems?: CSSProperties["alignItems"],
    /**
     * Display CSS
     */
    display?: CSSProperties["display"],
    /**
     * Witdh CSS
     */
    width?: CSSProperties["width"],
    /**
     * Height CSS
     */
    height?: CSSProperties["height"],
    /**
     * Style Properties CSS
     */
    style?: CSSProperties,
    /**
     * Padding CSS
     */
    p?: number,
    /**
     * Margin CSS
     */
    m?: number,
    /**
     * Horizontal padding CSS
     */
    px?: number,
    /**
     * Vertical padding CSS
     */
    py?: number,
    /**
     * Padding top CSS
     */
    pt?: number,
    /**
     * Padding left CSS
     */
    pl?: number,
    /**
     * Padding right CSS
     */
    pr?: number,
    /**
     * Padding bottom CSS
     */
    pb?: number,
    /**
     * Horizontal margin CSS
     */
    mx?: number,
    /**
     * Vertical margin CSS
     */
    my?: number,
    /**
     * Margin top CSS
     */
    mt?: number,
    /**
     * Margin bottom CSS
     */
    mb?: number,
    /**
     * Margin left CSS
     */
    ml?: number,
    /**
     * Margin right CSS
     */
    mr?: number,
    /**
     * Gap CSS
     */
    gap?: number
}

/**
 * Box Component
 */
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

    // Gap
    const gap = props.gap ?? props.gap;

    // Others styles
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
                ...styles,
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
