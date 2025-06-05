// src/lib/validators/index.ts
import { z } from "zod";

/**
 * Validador personalizado para DNI argentino
 * Acepta DNI sin puntos (formato: 12345678) de 7 a 8 dígitos
 */
export const dniValidator = z
  .string()
  .min(1, "DNI es requerido")
  .trim()
  .refine((dni) => {
    // Remover espacios y puntos si los hay
    const cleanDni = dni.replace(/[\s.]/g, "");

    // Verificar que solo contenga números
    if (!/^\d+$/.test(cleanDni)) {
      return false;
    }

    // Verificar longitud (7-8 dígitos para DNI argentino)
    return cleanDni.length >= 7 && cleanDni.length <= 8;
  }, "DNI debe tener entre 7 y 8 dígitos numéricos")
  .transform((dni) => {
    // Limpiar y devolver solo números
    return dni.replace(/[\s.]/g, "");
  });

/**
 * Validador personalizado para fechas de nacimiento
 * Verifica que la fecha sea válida y no esté en el futuro
 * Además verifica que la persona no tenga más de 120 años
 */
export const birthDateValidator = z
  .string()
  .min(1, "Fecha de nacimiento es requerida")
  .refine((dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }, "Fecha de nacimiento debe ser una fecha válida")
  .refine((dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date <= today;
  }, "Fecha de nacimiento no puede ser en el futuro")
  .refine((dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const maxAge = 120;
    const minDate = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    );
    return date >= minDate;
  }, "Fecha de nacimiento no puede ser mayor a 120 años")
  .refine((dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    // Verificar que la persona tenga al menos 1 día de vida
    const minDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    return date <= minDate;
  }, "Fecha de nacimiento debe ser al menos de ayer");

/**
 * Validador para nombres completos
 * Permite letras, espacios, acentos y caracteres especiales comunes en nombres
 */
export const fullNameValidator = z
  .string()
  .min(1, "Nombre completo es requerido")
  .max(100, "Nombre completo no puede exceder 100 caracteres")
  .trim()
  .refine((name) => {
    // Permitir letras, espacios, acentos, apostrofes y guiones
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/;
    return nameRegex.test(name);
  }, "Nombre completo solo puede contener letras, espacios, acentos, apostrofes y guiones")
  .refine((name) => {
    // Verificar que no sea solo espacios
    return name.trim().length > 0;
  }, "Nombre completo no puede estar vacío")
  .refine((name) => {
    // Verificar que tenga al menos 2 caracteres después del trim
    return name.trim().length >= 2;
  }, "Nombre completo debe tener al menos 2 caracteres")
  .transform((name) => {
    // Capitalizar primera letra de cada palabra
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  });

/**
 * Utilidad para formatear DNI con puntos
 */
export const formatDni = (dni: string): string => {
  const cleanDni = dni.replace(/[\s.]/g, "");
  if (cleanDni.length === 8) {
    return `${cleanDni.slice(0, 2)}.${cleanDni.slice(2, 5)}.${cleanDni.slice(
      5
    )}`;
  } else if (cleanDni.length === 7) {
    return `${cleanDni.slice(0, 1)}.${cleanDni.slice(1, 4)}.${cleanDni.slice(
      4
    )}`;
  }
  return dni;
};

/**
 * Utilidad para calcular edad desde fecha de nacimiento
 */
export const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Utilidad para formatear fecha en formato legible
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
