import { component$, useStylesScoped$, Slot, createContextId, useContext, useContextProvider } from "@builder.io/qwik";

type SwiperProps = {
    currentIndex: number; // Índice controlado por el padre
    gap?: number;
};

const context = createContextId<{ gap: number }>("prime.msg.components.swiper.context");

export const SwiperSlide = component$(() => {
    const swiper = useContext(context);
    
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

export default component$((props: SwiperProps) => {
    useStylesScoped$(/* css */`
        .swiper-container {
            overflow: hidden;
            width: 100%;
            position: relative;
        }

        .swiper-wrapper {
            display: flex;
            transition: transform 0.5s;
        }
    `);

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
