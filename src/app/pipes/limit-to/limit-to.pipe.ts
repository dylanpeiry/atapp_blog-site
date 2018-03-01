import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

    /**
     * Récupère un string en value et le formatte suivant un nombre de mots demandé.
     * @param value
     * @param args
     * @returns {any}
     */
    transform(value: string, args?: number): any {
        return value.split(" ").splice(0, args).join(" ") + " ...";
    }

}
