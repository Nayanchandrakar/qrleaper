const MaskBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-white transition-opacity duration-300 opacity-60">
      {/* Background gradient with mask */}
      <div className="absolute left-0 top-0 aspect-square w-full overflow-hidden sm:aspect-[2/1] [mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)] opacity-15">
        <div
          className="absolute inset-0 saturate-150"
          style={{
            backgroundImage:
              "conic-gradient(from -45deg at 50% -10%, rgb(58, 139, 253) 0deg, rgb(255, 0, 0) 172.98deg, rgb(133, 90, 252) 215.14deg, rgb(255, 123, 0) 257.32deg, rgb(58, 139, 253) 360deg)",
          }}
        ></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      {/* Overlay with gradient and blur */}
      <div className="absolute left-0 top-0 aspect-square w-full overflow-hidden sm:aspect-[2/1] [mask-image:radial-gradient(70%_100%_at_50%_0%,_black_70%,_transparent)] opacity-100 mix-blend-soft-light">
        <div
          className="absolute inset-0 saturate-150"
          style={{
            backgroundImage:
              "conic-gradient(from -45deg at 50% -10%, rgb(58, 139, 253) 0deg, rgb(255, 0, 0) 172.98deg, rgb(133, 90, 252) 215.14deg, rgb(255, 123, 0) 257.32deg, rgb(58, 139, 253) 360deg)",
          }}
        ></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>
    </div>
  )
}

export default MaskBackground
