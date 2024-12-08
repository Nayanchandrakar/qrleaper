"use client"

import { useEffect, useMemo, useRef, forwardRef } from "react"
import QRCodeStyling, { type Options } from "qr-code-styling"

import { colorsList } from "@/constants/qr/colors"
import { createBorder } from "@/components/package/qr-code/qr-border-styling"
import { appUrl } from "@/constants/config"
import type { QrCodeProps } from "@/types/type"

export const QrCode = forwardRef<HTMLDivElement, QrCodeProps>(
  ({
    shape = "square",
    bottomInput,
    color = colorsList[0],
    data = appUrl,
    hasFrame = false,
    logo,
    topInput,
    qrCodeRef,
  }) => {
    const localRef = useRef<HTMLDivElement>(null)

    const qrOptions = useMemo<Options>(() => {
      return {
        shape,
        type: "svg",
        width: 250,
        height: 250,
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
          color,
          roundSize: true,
        },
        backgroundOptions: {
          round: shape === "circle" ? 1 : 0.2,
          color: "white",
        },
        cornersSquareOptions: { type: "square" },
        cornersDotOptions: { type: "square" },
        imageOptions: { crossOrigin: "anonymous", saveAsBlob: true },
        ...(logo && { image: logo }),
      }
    }, [shape, hasFrame, data, color, logo])

    const extensionOptions = useMemo(() => {
      return {
        round: shape === "circle" ? 1 : 0.13,
        thickness: hasFrame ? 30 : 8,
        color,
        decorations: {
          ...(topInput &&
            hasFrame && {
              top: {
                type: "text",
                value: topInput,
                style: `font: 14px sans-serif; fill: white;`,
              },
            }),
          ...(bottomInput &&
            hasFrame && {
              bottom: {
                type: "text",
                value: bottomInput,
                style: `font: 14px sans-serif; fill: white;`,
              },
            }),
        },
      }
    }, [shape, hasFrame, color, topInput, bottomInput])

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
      // @ts-ignore
      const borderPlugin = createBorder(extensionOptions)
      qrCodeRef.current?.applyExtension((svg: SVGElement) =>
        // @ts-ignore
        borderPlugin(svg, {
          width: qrOptions.width!,
          height: qrOptions.height!,
        })
      )
    }, [extensionOptions, qrCodeRef, qrOptions.width, qrOptions.height])

    return <div ref={localRef} />
  }
)

QrCode.displayName = "QrCode"
