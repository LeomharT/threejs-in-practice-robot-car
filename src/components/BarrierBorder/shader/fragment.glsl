#define PI 3.1415926

uniform float uTime;
uniform float uRotation;
uniform float uRepeat;
uniform vec3 uColor;

varying vec2 vUv;

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

void main()
{
    vec3 color = vec3(0.0);
    vec2 uv = vUv;

    float alpha = 0.0;

    // Border
    if(uv.y > 0.0 && uv.y < 0.1)
    {
        color += uColor;
        alpha = 1.0;
    }
    if(uv.y > 0.9 && uv.y < 1.0)
    {
        color += uColor;
        alpha = 1.0;
    }

    uv.x += uTime * 0.1;
    
    uv.x *= uRepeat;
    uv.x = fract(uv.x);

    uv = rotateUV(uv, uRotation);


    if(uv.x > 0.25 && uv.x < 0.70)
    {
        color = uColor;
        alpha = 1.0;
    }

    gl_FragColor = vec4(color, alpha);
}