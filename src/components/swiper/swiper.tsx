import { component$, useStylesScoped$, Slot, createContextId, useContext, useContextProvider } from "@builder.io/qwik";

/**
 * Swiper props
 */
type SwiperProps = {
    /**
     * Current index
     */
    currentIndex: number;
    /**
     * Gap between elements
     */
    gap?: number;
};

/**
 * Swiper context
 */
const context = createContextId<{ gap: number }>("prime.msg.components.swiper.context");

/**
 * Swiper slide component
 */
export const SwiperSlide = component$(() => {
    // Use swiper config
    const swiper = useContext(context);
    
    // Apply styles
    useStylesScoped$(/*css*/`
        div {
            flex-shrink: 0;
            width: 100%;
        }
    `);
    
    return (
        <div style={{ padding: swiper.gap / 2 }}>
            <Slot></Slot>
        </div>
    );
});

/**
 * Swiper component
 */
export default component$((props: SwiperProps) => {

    // Apply styles
    useStylesScoped$(/* css */`
        .swiper-container {
            overflow: hidden;
            width: 100%;
            height: 100%;
            position: relative;
        }

        .swiper-wrapper {
            display: flex;
            transition: transform 0.5s;
        }
    `);

    // Provide context
    useContextProvider(context, {
        gap: props.gap ?? 0
    })

    return (
        <div class="swiper-container">
            <div
                class="swiper-wrapper"
                style={{
                    transform: `translateX(-${props.currentIndex * 100}%)`,
                }}
            >
                <Slot></Slot>
            </div>
        </div>
    );
});
