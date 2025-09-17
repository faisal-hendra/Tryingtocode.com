export class CoinObj{
    constructor(go_to=null, x_pos=0, y_pos=0, x_vel=0, y_vel=0){
        this.go_to = go_to;

        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.x_vel = x_vel;
        this.y_vel = y_vel;
    }

    tick(speed=1){
        this.gravitate(this.go_to);

        this.x_pos += this.x_vel * speed;
        this.y_pos += this.y_vel * speed; 
    }

    gravitate(go_to, drag=1){
        const gt_rect = go_to.getBoundingClientRect();
        const absolute_gt_x = gt_rect.left + window.scrollX;
        const absolute_gt_y = gt_rect.top + window.scrollY;

        let x_dist = absolute_gt_x - this.x_pos;
        let y_dist = absolute_gt_y - this.y_pos;

        let normalized_vector = normalizeVector(x_dist, y_dist);

        this.x_vel += normalized_vector[0] / drag;
        this.y_vel += normalized_vector[1] / drag;
    }

    RenderImage(ctx, sprite, frames=1, index=0){

        let spriteWidth = sprite.width / frames;
        let spriteHeight = sprite.height;
        let frameOffset = spriteWidth * index;
        ctx.drawImage(
            sprite,
            frameOffset, 0,   // source x, y
            spriteWidth, spriteHeight,       // source width, height
            this.x_pos, this.y_pos,          // destination x, y
            spriteWidth, spriteHeight        // destination width, height
        );
        
    }
}

function normalizeVector(x, y) {
    const length = Math.hypot(x, y); // same as sqrt(x^2 + y^2)
    if (length === 0) return [0, 0];
    return [x / length, y / length];
}

function normalizeNumbers(num1, num2) {
    const min_value = Math.min(num1, num2);
    const max_value = Math.max(num1, num2);
  
    if (max_value === min_value) {
      // If both numbers are the same, they normalize to 0 (or 0.5 if you prefer a midpoint)
      // For normalization to [0,1], if min === max, all values become 0.
      return [0, 0];
    }
  
    const normalized_num1 = (num1 - min_value) / (max_value - min_value);
    const normalized_num2 = (num2 - min_value) / (max_value - min_value);
  
    return [normalized_num1, normalized_num2];
}