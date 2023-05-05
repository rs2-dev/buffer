export class DataBuffer extends Uint8Array {

    readInt8: (offset: number) => number;
    readUInt8: (offset: number) => number;
    writeInt8: (value: number, offset: number) => number;
    readInt16BE: (offset: number) => number;
    readUInt16BE: (offset: number) => number;
    writeInt16BE: (value: number, offset: number) => number;
    readInt16LE: (offset: number) => number;
    readUInt16LE: (offset: number) => number;
    writeInt16LE: (value: number, offset: number) => number;
    readInt32BE: (offset: number) => number;
    readUInt32BE: (offset: number) => number;
    writeInt32BE: (value: number, offset: number) => number;
    readInt32LE: (offset: number) => number;
    readUInt32LE: (offset: number) => number;
    writeInt32LE: (value: number, offset: number) => number;
    readBigInt64BE: (offset: number) => bigint;
    readBigUInt64BE: (offset: number) => bigint;
    writeBigInt64BE: (value: bigint, offset: number) => number;
    readBigInt64LE: (offset: number) => bigint;
    readBigUInt64LE: (offset: number) => bigint;
    writeBigInt64LE: (value: bigint, offset: number) => number;
    copy: (targetBuffer: Uint8Array | DataBuffer, targetStart?: number, sourceStart?: number, sourceEnd?: number) => number;
    
    static from(data: Uint8Array | ReadonlyArray<number>): DataBuffer {
        return new DataBuffer(Buffer.from(data));
    }

    static alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): DataBuffer {
        return new DataBuffer(Buffer.alloc(size, fill, encoding));
    }

    static allocUnsafe(size: number): DataBuffer {
        return new DataBuffer(Buffer.allocUnsafe(size));
    }

    pos: number = 0;
    bitPos: number;

    getSlice(position: number, length: number): DataBuffer {
        return DataBuffer.from(this.slice(position, position + length));
    }

    readByte(): number {
        return this.readInt8(this.pos++);
    }

    readUByte(): number {
        return this.readUInt8(this.pos++);
    }

    writeByte(value: number): DataBuffer {
        this.writeInt8(value, this.pos++);
        return this;
    }

    readShortBE(): number {
        const offset = this.pos;
        this.pos += 2;
        return this.readInt16BE(offset);
    }

    readUShortBE(): number {
        const offset = this.pos;
        this.pos += 2;
        return this.readUInt16BE(offset);
    }

    writeShortBE(value: number): DataBuffer {
        this.writeInt16BE(value, this.pos);
        this.pos += 2;
        return this;
    }

    readShortLE(): number {
        const offset = this.pos;
        this.pos += 2;
        return this.readInt16LE(offset);
    }

    readUShortLE(): number {
        const offset = this.pos;
        this.pos += 2;
        return this.readUInt16LE(offset);
    }

    writeShortLE(value: number): DataBuffer {
        this.writeInt16LE(value, this.pos);
        this.pos += 2;
        return this;
    }

    readMediumBE(): number {
        const offset = this.pos;
        this.pos += 3;
        return ((this[offset]) << 16) + ((this[offset + 1]) << 8) + (this[offset + 2]);
    }

    readUMediumBE(): number {
        const offset = this.pos;
        this.pos += 3;
        return ((this[offset] & 0xff) << 16) + ((this[offset + 1] & 0xff) << 8) + (this[offset + 2] & 0xff);
    }

    writeMediumBE(value: number): void {
        this[this.pos++] = (value >> 16);
        this[this.pos++] = (value >> 8);
        this[this.pos++] = (value);
    }

    readMediumLE(): number {
        const offset = this.pos;
        this.pos += 3;
        return ((this[offset + 2]) << 16) + ((this[offset + 1]) << 8) + (this[offset]);
    }

    readUMediumLE(): number {
        const offset = this.pos;
        this.pos += 3;
        return ((this[offset + 2] & 0xff) << 16) + ((this[offset + 1] & 0xff) << 8) + (this[offset] & 0xff);
    }

    writeMediumLE(value: number): void {
        this[this.pos++] = (value);
        this[this.pos++] = (value >> 8);
        this[this.pos++] = (value >> 16);
    }

    readIntBE(): number {
        const offset = this.pos;
        this.pos += 4;
        return this.readInt32BE(offset);
    }

    readUIntBE(): number {
        const offset = this.pos;
        this.pos += 4;
        return this.readUInt32BE(offset);
    }

    writeIntBE(value: number): DataBuffer {
        const offset = this.pos;
        this.pos += 4;
        this.writeInt32BE(value, offset);
        return this;
    }

    readIntLE(): number {
        const offset = this.pos;
        this.pos += 4;
        return this.readInt32BE(offset);
    }

    readUIntLE(): number {
        const offset = this.pos;
        this.pos += 4;
        return this.readUInt32BE(offset);
    }

    writeIntLE(value: number): DataBuffer {
        const offset = this.pos;
        this.pos += 4;
        this.writeInt32BE(value, offset);
        return this;
    }

    // Integer with a big-middle endian order
    readIntBME(): number {
        const offset = this.pos;
        this.pos += 4;
        return ((this[offset]) << 16) + ((this[offset + 1]) << 24) + (this[offset + 2]) + ((this[offset + 3]) << 8);
    }

    // Unsigned integer with a big-middle endian order
    readUIntBME(): number {
        const offset = this.pos;
        this.pos += 4;
        return ((this[offset] & 0xff) << 16) + ((this[offset + 1] & 0xff) << 24) + (this[offset + 2] & 0xff) + ((this[offset + 3] & 0xff) << 8);
    }

    // Integer with a big-middle endian order
    writeIntBME(value: number): DataBuffer {
        const offset = this.pos;
        this.pos += 4;
        this[offset] = (value >> 16);
        this[offset + 1] = (value >> 24);
        this[offset + 2] = value;
        this[offset + 3] = (value >> 8);
        return this;
    }

    // Integer with a little-middle endian order
    readIntLME(): number {
        const offset = this.pos;
        this.pos += 4;
        return ((this[offset]) << 8) + (this[offset + 1]) + ((this[offset + 2]) << 24) + ((this[offset + 3]) << 16);
    }

    // Unsigned Integer with a little-middle endian order
    readUIntLME(): number {
        const offset = this.pos;
        this.pos += 4;
        return ((this[offset] & 0xff) << 8) + (this[offset + 1] & 0xff) + ((this[offset + 2] & 0xff) << 24) + ((this[offset + 3] & 0xff) << 16);
    }

    // Integer with a little-middle endian order
    writeIntLME(value: number): DataBuffer {
        const offset = this.pos;
        this.pos += 4;
        this[offset] = (value >> 8);
        this[offset + 1] = value;
        this[offset + 2] = (value >> 24);
        this[offset + 3] = (value >> 16);
        return this;
    }

    readLongBE(): bigint {
        const offset = this.pos;
        this.pos += 4;
        return this.readBigInt64BE(offset);
    }

    readULongBE(): bigint {
        const offset = this.pos;
        this.pos += 4;
        return this.readBigUInt64BE(offset);
    }

    writeLongBE(value: bigint): DataBuffer {
        const offset = this.pos;
        this.pos += 4;
        this.writeBigInt64BE(value, offset);
        return this;
    }

    readLongLE(): bigint {
        const offset = this.pos;
        this.pos += 4;
        return this.readBigInt64BE(offset);
    }

    readULongLE(): bigint {
        const offset = this.pos;
        this.pos += 4;
        return this.readBigUInt64BE(offset);
    }

    writeLongLE(value: bigint): DataBuffer {
        const offset = this.pos;
        this.pos += 4;
        this.writeBigInt64BE(value, offset);
        return this;
    }

    readBytes(to: DataBuffer | Buffer, length?: number): void {
        this.copy(to, 0, this.pos, this.pos + length);
        this.pos += length;
    }

    writeBytes(from: DataBuffer | Buffer, fromStart?: number, fromEnd?: number): DataBuffer {
        from.copy(this, this.pos, fromStart || 0, fromEnd || from.length);
        this.pos = (this.pos + from.length);
        return this;
    }

    truncate(): DataBuffer {
        const newBuffer = DataBuffer.alloc(this.pos);
        this.copy(newBuffer, 0, 0, this.pos);
        return newBuffer;
    }

    get remaining(): number {
        return this.length - this.pos;
    }
}

Object.setPrototypeOf(DataBuffer.prototype, Buffer.prototype);
