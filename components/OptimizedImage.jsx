'use client'

import Image from 'next/image'
import { useRef } from 'react'

export default function OptimizedImage({ src, alt, className }) {
  // const isLocalImage = src.startsWith('/')

  const blurredImageDiv = useRef(null)
  const loaded = () => {
    blurredImageDiv.current.classList.add('loaded')
  }

  return (
    <div
      className='blurred-img'
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}
      ref={blurredImageDiv}
    >
      {/* <picture>
        <source
          srcSet={
            isLocalImage ? require(`../public${src}?webp`) : `${src}?webp`
          }
          type='image/webp'
        />
        <source
          srcSet={isLocalImage ? require(`../public${src}`) : src}
          type='image/jpeg'
        />
        <img
          loading='lazy'
          src={isLocalImage ? require(`../public${src}`) : src}
          alt={alt}
          style={{ maxWidth: '100%', height: 'auto' }}
          onLoad={() => {
            setTimeout(() => {
              loaded()
            }, 2500)
          }}
        />
      </picture> */}
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={768}
        onLoad={e => {
          setTimeout(() => {
            loaded()
          }, 750)
        }}
        className={`object-contain object-center w-full h-auto max-h-[720px] aspect-auto ${className}`}
      />
    </div>
  )
}
