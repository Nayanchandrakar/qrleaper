"use client"

import QRCodeStyling, { type Gradient, type Options } from "qr-code-styling"
import { forwardRef, useEffect, useMemo, useRef } from "react"

import { createBorder } from "@/components/package/qr-code/qr-border-styling"
import { appUrl } from "@/constants/config"
import { cn } from "@/lib/utils"
import type { QrCodeProps } from "@/types/type"

export const QrCode = forwardRef<
  HTMLDivElement,
  QrCodeProps & { className?: string }
>(
  (
    {
      shape = "square",
      bottomInput,
      data = appUrl,
      hasFrame = false,
      logo,
      topInput,
      qrCodeRef,
      className,
      colorType,
      colors,
      rotation
    },
    _ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const isGradientSelected = useMemo<boolean>(
      () => colors?.length > 1,
      [colors]
    )

    const gradientOptions: Gradient = useMemo(
      () => ({
        colorStops: colors?.map((color, index) => ({
          offset: index,
          color
        })),
        type: colorType || "linear",
        rotation: rotation || 0
      }),
      [colors, colorType, rotation]
    )

    const qrOptions = useMemo<Options>(() => {
      return {
        shape,
        type: "svg",
        width: 250,
        height: 250,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "M"
        },
        margin: hasFrame
          ? shape === "square"
            ? 35
            : 40
          : shape === "circle"
            ? 20
            : 15,
        data,
        dotsOptions: {
          type: "classy-rounded",
          roundSize: true,
          ...(!isGradientSelected && { color: colors?.[0] }),
          ...(isGradientSelected && { gradient: gradientOptions })
        },
        backgroundOptions: {
          round: shape === "circle" ? 1 : 0.2,
          color: "white"
        },
        cornersSquareOptions: { type: "square" },
        cornersDotOptions: { type: "square" },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0,
          hideBackgroundDots: false,
          imageSize: 0.6,
          saveAsBlob: true
        },
        ...(logo && { image: logo })
      }
    }, [
      shape,
      hasFrame,
      data,
      logo,
      colors,
      gradientOptions,
      isGradientSelected
    ])

    const extensionOptions = useMemo(() => {
      return {
        round: shape === "circle" ? 1 : 0.13,
        thickness: hasFrame ? 30 : 8,
        color: colors?.[0],
        decorations: {
          ...(topInput &&
            hasFrame && {
              top: {
                type: "text",
                value: topInput,
                style: `font: 14px sans-serif; fill: white;`
              }
            }),
          ...(bottomInput &&
            hasFrame && {
              bottom: {
                type: "text",
                value: bottomInput,
                style: `font: 14px sans-serif; fill: white;`
              }
            })
        }
      }
    }, [shape, hasFrame, colors, topInput, bottomInput])

    // Initialize QRCodeStyling
    useEffect(() => {
      qrCodeRef.current = new QRCodeStyling(qrOptions)

      if (qrCodeRef.current && localRef.current) {
        localRef.current.innerHTML = ""
        qrCodeRef.current.append(localRef.current)
      }
    }, [qrOptions, qrCodeRef])

    // Apply border plugin
    useEffect(() => {
      // @ts-expect-error third-party type mismatch
      const borderPlugin = createBorder(extensionOptions)
      qrCodeRef.current?.applyExtension((svg: SVGElement) =>
        // @ts-expect-error third-party type mismatch
        borderPlugin(svg, {
          width: qrOptions.width!,
          height: qrOptions.height!
        })
      )
    }, [extensionOptions, qrOptions, qrCodeRef])

    return <div className={cn(className)} ref={localRef} />
  }
)

QrCode.displayName = "QrCode"
