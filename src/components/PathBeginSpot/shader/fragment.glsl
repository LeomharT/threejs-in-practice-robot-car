varying vec2 vUv;


void main()
{
    vec3 color = vec3(1.0);

    vec2 uv = vUv;

    if(uv.y > 0.4) {
        color = vec3(1.0, 0.25, 0.75);
    }

    gl_FragColor = vec4(color, 1.0);
}