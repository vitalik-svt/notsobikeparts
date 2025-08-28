export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <span className="flex w-9 h-9 bg-black rounded-full"></span>
            <span className="flex flex-col leading-none gap-0 select-none">
                <span
                    className="text-2xl uppercase"
                    style={{ fontFamily: "Helvetica, sans-serif" }}
                >
                    notso
                </span>
                <span className="text-base lowercase mt-[-10px] ml-[1px] tracking-[0.14em]" style={{ fontFamily: "Helvetica, sans-serif" }}>
                    bikeparts
                </span>
            </span>
        </div>
    );
}
