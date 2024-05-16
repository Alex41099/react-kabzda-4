import React from "react";


export const withSuspense = (Component) => {
        return <React.Suspense fallback={"Загрузка..."}>
            <Component/>
        </React.Suspense>

}

